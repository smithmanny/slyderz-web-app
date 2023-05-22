import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import { Contact, LibraryResponse } from "node-mailjet";

import db from "db";
import { Signup } from "app/auth/validations";
import { Role, TRANSACTIONAL_EMAILS } from "types";
import { getStripeServer } from "app/utils/getStripe";
import { mailjet, mailjetClient } from "app/utils/getMailjet";
import sendSesEmail from "emails/utils/sendSesEmail";

const stripe = getStripeServer();

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, name, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password);
    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const createUser = async () => {
      const stripeCustomer = await stripe.customers.create({
        email,
        name
      });

      const user = await db.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          hashedPassword,
          role: "USER",
          stripeCustomerId: stripeCustomer.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          stripeCustomerId: true,
        },
      });

      return user;
    };

    const createMailjetContact = async (user) => {
      const body: Contact.PostContactBody = {
        IsExcludedFromCampaigns: false,
        Name: name,
        Email: email,
      };
      let contact: LibraryResponse<Contact.GetContactResponse>;
      try {
        contact = await mailjet.post("contact").request(body);
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
        console.log("User not created cause of error...", err);
        await db.user.delete({ where: { id: user.id } });
        throw new Error("Try again later...");
      }

      return contact;
    };

    const user = await createUser();
    // Create contact in mailjet and add to list
    await createMailjetContact(user);
    await sendSesEmail({
      to: "contact@slyderz.co",
      type: TRANSACTIONAL_EMAILS.activation,
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
      stripeCustomerId: user.stripeCustomerId,
    });

    return user;
  }
);
