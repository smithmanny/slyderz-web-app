import { ReactNode } from "react"
import { Head } from "blitz"

import Appbar from 'app/core/components/appbar'
import Footer from 'app/core/components/footer'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-slyderz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
