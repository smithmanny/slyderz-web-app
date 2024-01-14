import { router, publicProcedure } from "../trpc";
import {
  AddUserToMailjet,
} from "app/validations/betaValidations";
import { createMailjetContact } from "app/lib/mailjet";

const betaRouter = router({
  addUserToMailjet: publicProcedure
    .input(AddUserToMailjet)
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      await createMailjetContact(email)

      return {
        message: "User added to mailing list!"
      }
    }),
});

export default betaRouter;
