import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Contact, LibraryResponse } from "node-mailjet";
import { hash } from 'argon2';

import { router, publicProcedure } from '../trpc';
import { TRANSACTIONAL_EMAILS } from "types";
import { mailjet, mailjetClient } from "app/utils/getMailjet";
import sendSesEmail from "emails/utils/sendSesEmail";
import type { User } from "lucia-auth"

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
      const userExists = await ctx.prisma.authUser.findFirst({
        where: {
          email: input.email,
        },
      });

      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists"
        })
      }

      const createUser = async () => {
        let user: User

        try {
          let stripeCustomerId: string = ""

          if (input.email === "shakhorsmith@gmail.com") {
            stripeCustomerId = "cus_LpSKis9bilj3rP"
          }

          if (!stripeCustomerId) {
            const stripeCustomer = await ctx.stripe.customers.create({
              email: input.email,
              name: input.name
            });

            stripeCustomerId = stripeCustomer.id
          }

          user = await ctx.auth.createUser({
            primaryKey: {
              providerId: "email",
              providerUserId: input.email,
              password: hashedPassword
            },
            attributes: {
              name: input.name,
              email: input.email,
              stripeCustomerId: stripeCustomerId
            }
          })
        } catch(err) {
          console.log("User not created", err)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Problem creating user."
          })
        }

        const createMailjetContact = async () => {
          const body: Contact.PostContactBody = {
            IsExcludedFromCampaigns: false,
            Name: input.name,
            Email: input.email,
          };

          try {
            const contact: LibraryResponse<Contact.GetContactResponse> = await mailjet.post("contact").request(body);
            const contactId = contact?.body?.Data[0]?.ID;

            if (contactId) {
              await mailjetClient
                .post("contact")
                .id(contactId)
                .action("managecontactslists")
                .request({
                  ContactsLists: [
                    {
                      ListID: 10251087, //Subscribers list
                      Action: "addnoforce",
                    },
                  ],
                });
            }
          } catch (err) {
            console.log("User not added to email list cause of error...", err);
          }
        };

        // Add user to email list
        await createMailjetContact()

        return user;
      };

      const [user] = await Promise.all([
        createUser(),
        sendSesEmail({
          to: "contact@slyderz.co",
          type: TRANSACTIONAL_EMAILS.activation,
        })
      ]).catch(err => {
        console.log(err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Problem creating user."
        })
      })

      const session = await ctx.auth.createSession(user.userId)
      ctx.auth.authRequest.setSession(session)

      // await ctx.session.$create({
      //   userId: user.id,
      //   role: user.role as Role,
      //   cart: {
      //     pendingCartItems,
      //     total,
      //   },
      //   stripeCustomerId: user.stripeCustomerId,
      // });

      return {
        message: "Successfully created user"
      }
    }),
  getSession: publicProcedure
    .query(async (opts) => {
      const session = opts.ctx.session

      if (session.sessionId && session.userId) {
        return {
          userId: session.userId
        }
      }

      return {}
    })
});

export default authRouter