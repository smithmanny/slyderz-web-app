import react from 'react'
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MapMarker } from 'mdi-material-ui'

import ConsumerContainer from '../shared/consumerContainer'
import Typography from '../shared/Typography'
import Section from '../shared/section'
import { Button } from '../shared'
import Grid from '../shared/Grid'
import Paper from '../shared/Paper'
import BasicForm, { TextField } from '../Form'
import loggedOutContainerStyles from './styles'

const LoggedOutContainer = () => {
  const classes = loggedOutContainerStyles()
  return (
    <ConsumerContainer disableGutters>
      <Grid container className={classes.container}>
        <Grid item xs>
          <Section className={classes.headerSection}>
            <div className={classes.headerSectionContent}>
              <Typography
                variant="h1"
                className={classes.title}
              >
                Homemade Meals, <br />
              By Local Chefs.
            </Typography>
              <Typography variant="h6">
                The best in-home experience. <br />
            Fresh, chef-crafted meals.
            </Typography>

              <BasicForm>
                <Paper elevation={3} className={classes.addressPaper}>
                  <TextField
                    name="address"
                    variant="outlined"
                    placeholder="Enter your address"
                    className={classes.userAddress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapMarker />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                  >
                    Find a Chef
                </Button>
                </Paper>
              </BasicForm>
            </div>
            <img src="/chef.jpg" alt="Personal chef cooking" className={classes.personalChef} />
          </Section>
        </Grid>
      </Grid>

      <Section
        title="How Slyderz Works"
        subTitle="3 easy steps"
        className={classes.howSlyderzWorks}
      >

      </Section>
    </ConsumerContainer>
  )
}

export default LoggedOutContainer