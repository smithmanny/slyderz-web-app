import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Contact, LibraryResponse } from "node-mailjet";
import { hash } from 'argon2';

import { router, publicProcedure } from '../trpc';

import { Signup } from "app/auth/validations";
import { Role, TRANSACTIONAL_EMAILS } from "types";
import { mailjet, mailjetClient } from "app/utils/getMailjet";
import sendSesEmail from "emails/utils/sendSesEmail";

const authRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6)
      })
    )
    .mutation(async (opts) => {
      const ctx = opts.ctx
      const input = opts.input

      const hashedPassword = await hash(input.password)
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      return userExists

      // if (userExists) {
      //   throw new TRPCError({
      //     code: "CONFLICT",
      //     message: "User already exists"
      //   })
      // }

      // const createUser = async () => {
      //   const stripeCustomer = await ctx.stripe.customers.create({
      //     email: input.email,
      //     name: input.name
      //   });

      //   const user = await ctx.prisma.user.create({
      //     data: {
      //       email: input.email.toLowerCase(),
      //       name: input.name,
      //       hashedPassword,
      //       role: "USER",
      //       stripeCustomerId: stripeCustomer.id,
      //     },
      //     select: {
      //       id: true,
      //       name: true,
      //       email: true,
      //       role: true,
      //       stripeCustomerId: true,
      //     },
      //   });

      //   return user;
      // };

      // const createMailjetContact = async (user) => {
      //   const body: Contact.PostContactBody = {
      //     IsExcludedFromCampaigns: false,
      //     Name: input.name,
      //     Email: input.email,
      //   };
      //   let contact: LibraryResponse<Contact.GetContactResponse>;
      //   try {
      //     contact = await mailjet.post("contact").request(body);
      //     const contactId = contact?.body?.Data[0]?.ID;

      //     if (contactId) {
      //       await mailjetClient
      //         .post("contact")
      //         .id(contactId)
      //         .action("managecontactslists")
      //         .request({
      //           ContactsLists: [
      //             {
      //               ListID: 10251087, //Subscribers list
      //               Action: "addnoforce",
      //             },
      //           ],
      //         });
      //     }
      //   } catch (err) {
      //     console.log("User not created cause of error...", err);
      //     await ctx.prisma.user.delete({ where: { id: user.id } });
      //     throw new TRPCError({
      //       code: "BAD_REQUEST",
      //       message: "Please try again later"
      //     })
      //   }

      //   return contact;
      // };

      // const user = await createUser();
      // // Create contact in mailjet and add to list
      // await createMailjetContact(user);
      // await sendSesEmail({
      //   to: "contact@slyderz.co",
      //   type: TRANSACTIONAL_EMAILS.activation,
      // });

      // // Merge pending carts from logged out session
      // const pendingCartItems = ctx.session?.cart?.pendingCartItems || [];
      // const total = ctx.session?.cart?.total || 0;

      // await ctx.session.$create({
      //   userId: user.id,
      //   role: user.role as Role,
      //   cart: {
      //     pendingCartItems,
      //     total,
      //   },
      //   stripeCustomerId: user.stripeCustomerId,
      // });

      // return user;
    }),
});

export default authRouter