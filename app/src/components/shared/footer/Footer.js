import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import { EmailOutline } from 'mdi-material-ui'
import { MapMarker } from 'mdi-material-ui'

import footerStyles from './styles'

import Divider from '../Divider'
import Grid from '../Grid'
import Section from '../section'
import Paper from '../Paper'
import Typography from '../Typography'
import { Button } from '../index'
import BasicForm, { TextField } from '../../form'

const Footer = () => {
  const classes = footerStyles();
  return (
    <footer className={classes.footer}>
      <Section>
        <Grid container>
          <Grid item xs={12} md={6}>
            <BasicForm>
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
                <span className={classes.signup}>
                  <TextField
                    name="address"
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
                  >
                    Find a Chef
                </Button>
                </span>
              </Paper>
            </BasicForm>
          </Grid>
          <Grid item xs={12} md={6}>
            <table className={classes.table}>
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
                  <Typography variant="body1">About</Typography>
                </td>
                <td>
                  <Typography variant="body1">Join Slyderz</Typography>
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
                  <Typography variant="body1">Contact</Typography>
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
            </table>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
      </Section>
    </footer>
  )
}

export default Footer