import React from 'react'
import Link from 'next/link'
import InputAdornment from '@material-ui/core/InputAdornment'
import { EmailOutline, Facebook, Twitter, Instagram } from 'mdi-material-ui'

import footerStyles from './styles'
import { withWindow } from '../WindowProvider'

import Divider from '../Divider'
import Grid from '../Grid'
import Section from '../section'
import Paper from '../Paper'
import Typography from '../Typography'
import Button from '../Button'
import BasicForm, { TextField } from '../../form'

const Footer = ({ isMobile }) => {
  const classes = footerStyles();
  return (
    <footer className={classes.footer}>
      <Section>
        <Grid container direction={isMobile ? 'row' : 'row-reverse'}>
          <Grid item xs={12} md={6}>
              <Paper className={classes.newsletterPaper}>
                <Typography
                  className={classes.text}
                  color="primary"
                  variant="h6"
                >
                  We’re cooking up something delicious.
                <br />
                Sign up to find out more.
              </Typography>
                <BasicForm 
                  className={classes.form}
                  mutate={{
                    onSubmit: (variables) => {
                      fetch('/api/sendgrid', { method: 'POST', body: variables.email })
                    },
                    toVariables: values => ({
                      ...values
                    })
                  }}
                >
                  <span className={classes.signup}>
                    <TextField
                      name="email"
                      variant="outlined"
                      className={classes.emailAddress}
                      placeholder="Email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutline />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      color="primary"
                      className={classes.button}
                      variant="contained"
                      type="submit"
                    >
                      Find a Chef
                  </Button>
                  </span>
                </BasicForm>
              </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <th>
                    <Typography variant="h6">Company</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Chefs</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Support</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Cities</Typography>
                  </th>
                </tr>
                <tr>
                  <td>
                    <Link href="/about">
                      <Typography variant="body1" component="a">About</Typography>
                    </Link>
                  </td>
                  <td>
                    <Link href='/become-a-chef'>
                      <Typography variant="body1" component="a">Join Slyderz</Typography>
                    </Link>
                  </td>
                  <td>
                    <Typography variant="body1">Consumer Help</Typography>
                  </td>
                  <td>
                    <Typography variant="body1">Atlanta</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/contact">
                      <Typography variant="body1" component="a">Contact</Typography>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1">Blog</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1">Terms</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1">Privacy</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.socialContainer}>
              <Typography variant="h6">&#169; 2020 Slyderz LLC</Typography>
              <span>
                <ul className={classes.socialList}>
                  <li>
                    <a href="https://www.facebook.com/slyderz" target="__blank">
                      <Facebook />
                    </a>
                    </li>
                  <li>
                    <a href="https://twitter.com/SlyderzApp" target="__blank">
                      <Twitter />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/slyderz_app/" target="__blank">
                      <Instagram />
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </Grid>
        </Grid>
      </Section>
    </footer>
  )
}

export default withWindow(Footer)