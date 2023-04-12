import Link from "next/link";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";

import NearbyChefQuery from 'app/chefs/queries/getNearbyChefsQuery'

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

const NearbyChefs = (props) => {
  const [nearbyChefs] = useQuery(NearbyChefQuery, null)
  return (
    <>
      {nearbyChefs.map((chef, index) => (
        <Grid key={`${chef.user.firstName}-${index}`} item xs={12} sm={6} md={4} lg={2}>
          <Link href={Routes.ChefPage({ cid: chef.id })}>
            <Card sx={{ maxWidth: 245 }}>
              <CardMedia
                image="/headshot.jpeg"
                title="Chef dish"
                sx={{
                  borderRadius: '50%',
                  width: 175,
                  height: 175,
                  margin: 'auto',
                  objectFit: 'contain',
                  objectPosition: '50% 50%'
                }}
              />
              <CardContent>
                <Typography variant="body1">BBQ • Atlanta</Typography>
                <Typography variant="h6">{chef.user.firstName}</Typography>
                <Typography variant="subtitle2">
                  Starting at $17/person
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </>
  )
}

const LoggedinLayout: BlitzPage = () => {
  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          container
          spacing={2}
          sx={{
            minHeight: '250px',
            textAlign: "center",
            mb: { xs: 5, md: 10 }
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h1" marginBottom={1}>
              Unforgettable Dining with Slyderz
            </Typography>
            <Typography variant="h6">
              Enjoy the convenience of restaurant-quality meals cooked in your home.
            </Typography>

            <Link href={Routes.About()}>
              <Button
                sx={{ mt: 4 }}
                variant="outlined"
                label="learn-more"
              >
                Learn More
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Nearby Chefs</Typography>
        </Grid>
        <NearbyChefs />
      </Grid>
    </ConsumerContainer>
  )
}

export default LoggedinLayout
