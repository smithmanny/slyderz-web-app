import { useRouter, BlitzPage } from "blitz"

import Layout from "app/core/layouts/Layout"
import ConsumerContainer from 'app/core/components/shared/ConsumerContainer'
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <ConsumerContainer>
      <LoginForm
        onSuccess={() => {
          const next = (router.query.next as string) ?? "/"
          router.push(next)
        }}
      />
    </ConsumerContainer>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
