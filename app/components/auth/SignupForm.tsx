import Link from "next/link";

import { Signup } from "validations/authValidations";
import { trpc } from "server/utils/trpc";

import Form, { TextField } from "app/components/form";
import Grid from "app/components/shared/Grid";
import Box from "app/components/shared/Box";
import Typography from "app/components/shared/Typography";

type SignupFormProps = {
  onSuccess?: (values?: any) => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const utils = trpc.useUtils();
  const createUser = trpc.auth.createUser.useMutation({
    onSuccess: async () => {
      await utils.user.fetchUserData.prefetch();
    },
  });

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        margin: "auto",
        maxWidth: 550,
      }}
    >
      <Typography gutterBottom variant="h4" align="center">
        Create an Account
      </Typography>

      <Form
        submitText="Create Account"
        schema={Signup}
        mutation={{
          schema: createUser.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
        {...props}
      >
        <Grid container item xs={12} spacing={2}>
          <TextField
            autoComplete="given-name"
            label="First Name"
            name="name"
            required={true}
            md={12}
          />
        </Grid>
        <TextField
          autoComplete="email"
          label="Email"
          name="email"
          required={true}
        />
        <TextField
          label="Password"
          name="password"
          required={true}
          type="password"
        />
      </Form>

      <div style={{ marginTop: "1rem", color: "#000" }}>
        Or{" "}
        <Link href="/login" style={{ color: "#000" }}>
          Log In
        </Link>
      </div>
    </Box>
  );
};

export default SignupForm;
