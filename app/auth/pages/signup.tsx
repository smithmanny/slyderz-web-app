import { useRouter, BlitzPage } from "blitz"

import ConsumerContainer from 'app/core/components/shared/ConsumerContainer'
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <ConsumerContainer maxWidth="sm">
      <SignupForm onSuccess={() => router.push("/")} />
    </ConsumerContainer>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
