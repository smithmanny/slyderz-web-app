import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`slyderz`, `mobile chefs`, ` private chefs`]} />
    <div 
      style={{ 
        maxWidth: '640px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Image />
    </div>
    <h3 style={{ textAlign: 'center', margin: 0 }}>On-demand mobile restaurant</h3>

    <main style={{ marginTop: '3rem' }}>
      <p for="email">Notify me when it launches 🚀</p>
      <form 
        name='notify' 
        method='POST' 
        className='form' 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
      >
        <input type='hidden' name='form-name' value='notify' />
        <input type="email" name="email" className="email" placeholder="Your email" required />
        <input type="submit" className='email-btn' value="Submit 👍🏾" />
      </form>
      <p style={{ textAlign: 'center' }}>In the meantime, <a href="https://twitter.com/glimapp" className="brand">follow us on twitter</a> for updates and more...</p>
    </main>

  </Layout>
)

export default IndexPage
