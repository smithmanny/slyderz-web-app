import react from 'react'
import classNames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MapMarker } from 'mdi-material-ui'

import loggedOutContainerStyles from './styles'

import ConsumerContainer from '../shared/consumerContainer'
import Typography from '../shared/Typography'
import Section from '../shared/section'
import { Button } from '../shared'
import Grid from '../shared/Grid'
import Paper from '../shared/Paper'
import BasicForm, { TextField } from '../Form'
import { BowlIcon } from '../../assets/icons'
import { ChefIcon } from '../../assets/icons'
import { MenuIcon } from '../../assets/icons'

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
        subTitle="3 EASY STEPS"
        className={classes.howSlyderzWorks}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className={classes.howSlyderzWorksCard}>
              <ChefIcon />
              <Typography variant="h5">Choose Your Chef</Typography>
              <Typography variant="h6">All Slyderz chefs have undergone extensive training and food safety handling</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.howSlyderzWorksCard}>
              <MenuIcon />
              <Typography variant="h5">Pick Your Dishes</Typography>
              <Typography variant="h6">Order in advance so chefs can be fresh ingredients</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.howSlyderzWorksCard}>
              <BowlIcon />
              <Typography variant="h5">Enjoy in-home Experience</Typography>
              <Typography variant="h6">Affordable private chef at your home </Typography>
            </div>
          </Grid>
        </Grid>
      </Section>
      <section className={classes.foodSafetyContainer}>
        <Section>
          <Grid container>
            <Grid item xs={12} md={6}>
              <img src="/food-safety.jpg" alt="Personal chef cooking" className={classes.foodSafetyPic} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.foodSafetyContentContainer}>
              <Typography variant="h2" className={classes.foodSafety}>Food Safety</Typography>
              <Typography className={classes.foodSafetyContent} paragraph>
                We’re committed to ensuring that your food will always be safe to eat by requiring our chefs to cook only fresh meat purchased the day of their scheduled event.
              <br />
                <br />
              All of our chefs have undergone extensive food safety training, including COVID-19 specific precautions and are required to have an active food handlers card. Chefs are required to cook out of commercial kitchens or other legally permissible facilities.
            </Typography>
            </Grid>
          </Grid>
        </Section>
      </section>
      <section className={classes.readyToOrderContainer}>
        <Section>
          <Typography variant="h2" align="center">Find Local Chefs</Typography>
          <BasicForm>
            <Paper elevation={3} className={classNames(classes.addressPaper, classes.addressPaperFooter)}>
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
        </Section>
      </section>
      <Section className={classes.becomeAChefContainer}>
        <Grid container alignItems="center">
          <Grid item xs={12} md>
            <Typography variant="h3" className={classes.becomeAChef}>Become a Chef.</Typography>
          </Grid>
          <Grid item xs={12} md>
            <Typography className={classes.becomeAChefSubText} paragraph>Launching your private chef career has never been easier</Typography>
          </Grid>
          <Grid item xs={12} md className={classes.becomeAChefButton}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Section>
    </ConsumerContainer>
  )
}

export default LoggedOutContainer