import { Link, useMutation, Routes } from "blitz"

import styles from "app/auth/styles/signupFormStyles"
import loginMutation from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

import Typography from "app/core/components/shared/Typography"
import Paper from "app/core/components/shared/Paper"
import Form, { TextField } from "app/core/components/form"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const classes = styles();
  const [login] = useMutation(loginMutation)

  return (
    <Paper className={classes.form}>
      <Typography gutterBottom variant="h1">Login</Typography>

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
    </Paper>
  )
}

export default LoginForm
