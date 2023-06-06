import Link from "next/link";

import { Login } from "app/auth/validations";
import { trpc } from "server/utils/trpc";
import { useAppDispatch } from "integrations/redux";
import { fetchUserData } from "integrations/redux/reducers/userReduer";

import Typography from "app/core/components/shared/Typography";
import Box from "app/core/components/shared/Box";
import Grid from "app/core/components/shared/Grid";
import Form, { TextField } from "app/core/components/form";

type LoginFormProps = {
  onSuccess?: () => void;
};

const LoginForm = (props: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const login = trpc.auth.login.useMutation({
    onSuccess: () => {
      dispatch(fetchUserData()).unwrap();
    },
  });

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        margin: "auto",
        maxWidth: 550,
        width: "100%",
      }}
    >
      <Typography gutterBottom variant="h4">
        Login
      </Typography>

      <Form
        submitText="Login"
        schema={Login}
        mutation={{
          schema: login.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
        {...props}
      >
        <TextField
          autoComplete="email"
          name="email"
          label="Email"
          placeholder="Email"
        />
        <TextField
          autoComplete="current-password"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <Grid item xs={12}>
          <Link href="/auth/forgot-password">
            <Typography color="#000">Forgot your password?</Typography>
          </Link>
        </Grid>
      </Form>

      <div style={{ marginTop: "1rem", color: "#000" }}>
        Or{" "}
        <Link href="/auth/signup" style={{ color: "#000" }}>
          Sign Up
        </Link>
      </div>
    </Box>
  );
};

export default LoginForm;
