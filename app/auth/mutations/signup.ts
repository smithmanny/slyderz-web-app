import { SecurePassword } from "@blitzjs/auth";
import { resolver } from "@blitzjs/rpc";
import sendgridClient from '@sendgrid/client'
import Stripe from 'stripe'

import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

sendgridClient.setApiKey(process.env.SENDGRID_API_TOKEN || '')

export default resolver.pipe(resolver.zod(Signup), async ({ email, firstName, lastName, password }, ctx) => {
  console.log('STRIP', process.env.STRIPE_SECRET)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-08-01" });
  const hashedPassword = await SecurePassword.hash(password)
  const userExists = await db.user.findFirst({
    where: {
      email
    }
  })

  if (userExists) {
    throw new Error('User already exists')
  }

  const stripeCustomer = await stripe.customers.create({
    email,
    name: `${firstName} ${lastName}`,
  })

  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      firstName,
      lastName,
      hashedPassword,
      role: "USER",
      stripeCustomerId: stripeCustomer.id,
    },
    select: { id: true, firstName: true, lastName: true, email: true, role: true },
  })

  // // Create user in sendgrid
  const data = {
    "contacts": [
      {
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "custom_fields": {
          "e2_T": "false",  // confirmed_email
        }
      }
    ]
  };

  const request:any = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }

  sendgridClient.request(request)
    .catch(error => {
      console.error(error);
    });

  // Merge pending carts from logged out session
  const pendingCartItems = ctx.session?.cart?.pendingCartItems || [];
  const total = ctx.session?.cart?.total || 0;

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    cart: {
      pendingCartItems,
      total,
    },
    stripeCustomerId: stripeCustomer.id
  })

  return user
})
