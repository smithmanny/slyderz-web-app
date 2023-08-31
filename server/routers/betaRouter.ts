import { router, publicProcedure } from "../trpc";
import {
  AddUserToMailjet,
} from "app/beta/validations";
import { createMailjetContact } from "app/helpers/mailjet";

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
