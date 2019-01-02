import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`slyderz`, `mobile chefs`, ` mobile`]} />
    <h1>Coming Soon</h1>
    <div style={{ maxWidth: `300px`, width: '100%', marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
