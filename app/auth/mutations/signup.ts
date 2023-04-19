import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import { Contact, LibraryResponse } from 'node-mailjet'

import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { getStripeServer } from 'app/utils/getStripe'
import { mailjet, mailjetClient } from 'app/utils/getMailjet'

export default resolver.pipe(resolver.zod(Signup), async ({ email, firstName, lastName, password }, ctx) => {
  const stripe = getStripeServer()
  const hashedPassword = await SecurePassword.hash(password)
  const userExists = await db.user.findFirst({
    where: {
      email
    }
  })

  if (userExists) {
    throw new Error('User already exists')
  }

  const createUser = async() => {
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
      select: { id: true, firstName: true, lastName: true, email: true, role: true, stripeCustomerId: true },
    })

    return user
  }

  const createMailjetContact = async(user) => {
    const body: Contact.PostContactBody = {
      "IsExcludedFromCampaigns": false,
      "Name": firstName,
      "Email": email
    }
    let contact: LibraryResponse<Contact.GetContactResponse>
    try {
      contact = await mailjet.post("contact").request(body)
      const contactId = contact?.body?.Data[0]?.ID

      if (contactId) {
        await mailjetClient.post("contact").id(contactId).action('managecontactslists')
          .request({
            ContactsLists: [
              {
                ListID: 10251087, //Subscribers list
                Action: 'addnoforce'
              }
            ]
          })
      }
    } catch (err) {
      console.log('User not created cause of error...', err)
      await db.user.delete({ where: { id: user.id }})
      throw new Error("Contact not created")
    }

    return contact
  }

  const user = await createUser()
  // Create contact in mailjet and add to list
  await createMailjetContact(user)
  // TODO: Send activation email

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
    stripeCustomerId: user.stripeCustomerId
  })

  return user
})
