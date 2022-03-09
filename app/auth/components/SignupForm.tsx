import { useMutation } from "blitz"

import signupMutation from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

import Form, { TextField } from "app/core/components/form"
import Grid from "app/core/components/shared/Grid"
import Box from "app/core/components/shared/Box"
import Typography from "app/core/components/shared/Typography"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signup] = useMutation(signupMutation)

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: 'center',
        margin: 'auto',
        maxWidth: 550,
      }}
    >
      <Typography gutterBottom variant="h4" align="center">Create an Account</Typography>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: ""
        }}
        mutation={{
          schema: signup,
          toVariables: values => ({
            ...values
          })
        }}
        {...props}
      >
        <Grid container item xs={12} spacing={2}>
          <TextField label="First Name" name="firstName" required={true} md={6} />
          <TextField label="Last Name" name="lastName" required={true} md={6} />
        </Grid>
        <TextField label="Email" name="email" required={true} />
        <TextField label="Password" name="password" required={true} type="password" />
      </Form>
    </Box>
  )
}

export default SignupForm
