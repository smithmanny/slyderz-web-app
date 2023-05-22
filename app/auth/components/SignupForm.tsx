import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";

import signupMutation from "app/auth/mutations/signup";
import { Signup } from "app/auth/validations";

import Form, { TextField } from "app/core/components/form";
import Grid from "app/core/components/shared/Grid";
import Box from "app/core/components/shared/Box";
import Typography from "app/core/components/shared/Typography";

type SignupFormProps = {
  onSuccess?: (values?: any) => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signup] = useMutation(signupMutation);

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
        initialValues={{
          email: "",
          name: "",
          password: "",
        }}
        mutation={{
          schema: signup,
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
            md={6}
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
        <Link href={Routes.LoginPage()} style={{ color: "#000" }}>
          Log In
        </Link>
      </div>
    </Box>
  );
};

export default SignupForm;
