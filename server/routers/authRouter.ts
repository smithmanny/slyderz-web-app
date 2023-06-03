import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Contact, LibraryResponse } from "node-mailjet";
import { LuciaTokenError } from "@lucia-auth/tokens";

import { passwordResetToken } from "integrations/auth/lucia";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRANSACTIONAL_EMAILS } from "types";
import { mailjet, mailjetClient } from "app/utils/getMailjet";
import sendSesEmail from "emails/utils/sendSesEmail";

import { Signup, Login } from "app/auth/validations";

const authRouter = router({
  createUser: publicProcedure.input(Signup).mutation(async (opts) => {
    const ctx = opts.ctx;
    const input = opts.input;

    const userExists = await ctx.prisma.authUser.findFirst({
      where: {
        email: input.email,
      },
    });

    if (userExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }

    const createMailjetContact = async () => {
      const body: Contact.PostContactBody = {
        IsExcludedFromCampaigns: false,
        Name: input.name,
        Email: input.email,
      };

      try {
        const contact: LibraryResponse<Contact.GetContactResponse> =
          await mailjet.post("contact").request(body);
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

    const createUser = async () => {
      try {
        let stripeCustomerId = "";

        if (input.email === "shakhorsmith@gmail.com") {
          stripeCustomerId = "cus_LpSKis9bilj3rP";
        }

        if (!stripeCustomerId) {
          const stripeCustomer = await ctx.stripe.customers.create({
            email: input.email,
            name: input.name,
          });

          stripeCustomerId = stripeCustomer.id;
        }

        const user = await ctx.auth.createUser({
          primaryKey: {
            providerId: "email",
            providerUserId: input.email,
            password: input.password,
          },
          attributes: {
            name: input.name,
            email: input.email,
            stripeCustomerId: stripeCustomerId,
          },
        });

        // Add user to email list
        await createMailjetContact();

        return user;
      } catch (err) {
        console.log("User not created", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Problem creating user.",
        });
      }
    };

    const [user] = await Promise.all([
      createUser(),
      sendSesEmail({
        to: "contact@slyderz.co",
        type: TRANSACTIONAL_EMAILS.activation,
      }),
    ]).catch((err) => {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Problem creating user.",
      });
    });

    const session = await ctx.auth.createSession(user.userId);
    ctx.authRequest.setSession(session);

    return user.userId;
  }),
  getSession: publicProcedure.query(async (opts) => {
    const session = opts.ctx.session;

    if (session.sessionId && session.userId) {
      return {
        userId: session.userId,
      };
    }

    return {};
  }),
  logout: protectedProcedure.mutation(async (opts) => {
    const session = opts.ctx.session;

    await opts.ctx.auth.invalidateAllUserSessions(session.userId);
    opts.ctx.authRequest.setSession(null);
  }),
  login: publicProcedure.input(Login).mutation(async (opts) => {
    const input = opts.input;
    const ctx = opts.ctx;

    try {
      const key = await ctx.auth.useKey("email", input.email, input.password);
      const session = await ctx.auth.createSession(key.userId);
      ctx.authRequest.setSession(session);
    } catch (err) {
      console.log("Failed logining in", err);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Problem logging user in.",
      });
    }
  }),
  sendPasswordResetLink: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async (opts) => {
      const dbUser = opts.ctx.prisma.authUser.findFirst({
        where: {
          email: opts.input.email,
        },
      });

      if (!dbUser) {
        return await new Promise((resolve) => setTimeout(resolve, 750));
      }

      const user = opts.ctx.auth.transformDatabaseUser(dbUser);
      const token = await passwordResetToken.issue(user.userId);

      await sendSesEmail({
        to: user.email,
        type: TRANSACTIONAL_EMAILS.forgotPassword,
        variables: {
          resetPasswordUrl: `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`,
        },
      });

      return;
    }),
  handlePasswordReset: publicProcedure
    .input(
      z.object({
        token: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const input = opts.input;
      const authRequest = opts.ctx.authRequest;

      try {
        const token = await passwordResetToken.validate(input.token);
        const user = await opts.ctx.auth.getUser(token.userId);

        // Invalidate all sessions, user tokens and update password
        await Promise.all([
          opts.ctx.auth.invalidateAllUserSessions(user.userId),
          passwordResetToken.invalidateAllUserTokens(user.userId),
          opts.ctx.auth.updateKeyPassword("email", user.email, input.password),
        ]);

        // update key
        const session = await opts.ctx.auth.createSession(user.userId);
        authRequest.setSession(session);
      } catch (e) {
        console.log("Error resetting password", e);
        if (e instanceof LuciaTokenError && e.message === "EXPIRED_TOKEN") {
          // expired token/link
        }
        if (e instanceof LuciaTokenError && e.message === "INVALID_TOKEN") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please try again",
          });
        }
      }
      // TODO
      // await sendSesEmail({
      //   to: user.email,
      //   type: TRANSACTIONAL_EMAILS.forgotPassword,
      //   variables: {
      //     resetPasswordUrl: `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`,
      //   },
      // });

      return;
    }),
  updatePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async (opts) => {
      const input = opts.input;
      const email = opts.ctx.session.user.email;

      try {
        const key = await opts.ctx.auth.useKey(
          "email",
          email,
          input.currentPassword
        );
        await opts.ctx.auth.updateKeyPassword(
          key.providerId,
          key.providerUserId,
          input.newPassword
        );
      } catch (err) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Wrong password",
        });
      }
    }),
});

export default authRouter;
