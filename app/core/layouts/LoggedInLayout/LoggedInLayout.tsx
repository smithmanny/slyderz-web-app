import Link from "next/link";
import { BlitzPage, Routes } from "@blitzjs/next";

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

const NearbyChefs = (props) => {
  const chefs = [
    {
      name: 'Shaki'
    },
    {
      name: 'Mar'
    },
    {
      name: 'Nicole'
    },
    {
      name: 'John'
    }
  ]
  return (
    <>
      {chefs.map((chef, index) => (
        <Grid key={`${chef.name}-${index}`} item xs={12} md={2}>
          <Link href={Routes.ChefPage({ cid: 1 })}>
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
                <Typography variant="h6">{chef.name}</Typography>
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
            mb: 10
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
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Nearby Chefs</Typography>
          </Grid>
          <NearbyChefs />
        </Grid>
      </Grid>
    </ConsumerContainer>
  )
}

export default LoggedinLayout
