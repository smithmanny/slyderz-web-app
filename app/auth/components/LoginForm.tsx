import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";

import loginMutation from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

import Typography from "app/core/components/shared/Typography"
import Box from "app/core/components/shared/Box"
import Form, { TextField } from "app/core/components/form"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [login] = useMutation(loginMutation)

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: 'center',
        margin: 'auto',
        maxWidth: 550,
        width: '100%'
      }}
    >
      <Typography gutterBottom variant="h4">Login</Typography>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        mutation={{
          schema: login,
          toVariables: values => ({
            ...values
          })
        }}
        {...props}
      >
        <TextField name="email" label="Email" placeholder="Email" />
        <TextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>
              <Typography>Forgot your password?</Typography>
            </a>
          </Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Box>
  )
}

export default LoginForm
