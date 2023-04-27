import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Form, { TextField } from "app/core/components/form"
import Typography from "app/core/components/shared/Typography"
import Button from "app/core/components/shared/Button"

import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  const bud = false
  return (
    <ConsumerContainer maxWidth="sm">
      {isSuccess ? (
        <div>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Request Submitted
          </Typography>
          <Typography>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </Typography>
          <Link href={Routes.Home()}>
            <Button label="Go home" variant="text" sx={{ pl: 0 }}>
              Go back home
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Forgot your password?
          </Typography>
          <Form
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            mutation={{
              schema: forgotPasswordMutation,
              toVariables: (values) => ({
                ...values,
              }),
            }}
          >
            <TextField name="email" label="Email" placeholder="Email" />
          </Form>
        </>
      )}
    </ConsumerContainer>
  )
}
ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
