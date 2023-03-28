import Link from "next/link";
import { BlitzPage, Routes } from "@blitzjs/next";

import { styled } from "integrations/material-ui"

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

const ChefCard = styled(Card)`
 & .MuiCard-root {
    background: transparent;
    box-shadow: none;
    max-width: 308px;
  }
`
const ChefCardContent = styled(CardContent)`
 & .MuiCardContent-root {
      padding-top: 8px;
    }
`

const LoggedinLayout: BlitzPage = () => {
  const renderChefs = () => (
    <Link href={Routes.ChefPage({ cid: 1 })}>
      <a>
        <ChefCard>
          <CardMedia
            image="/logo.png"
            component="img"
            height="140"
            title="Chef dish"
          />
          <ChefCardContent
            sx={{
              "& .name": {
                mt: 1,
                mr: 1,
                mb: 1,
                ml: 0,
              },
            }}
          >
            <Typography variant="button">BBQ • Atlanta</Typography>
            <div className="name">
              <Typography variant="h6">Chef Shakhor</Typography>
            </div>
            <Typography variant="body1">
              Starting at $17/person
            </Typography>
          </ChefCardContent>
        </ChefCard>
      </a>
    </Link>
  )

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
            textAlign: "center"
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
              >
                Learn More
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          {renderChefs()}
        </Grid>
      </Grid>
    </ConsumerContainer>
  )
}

export default LoggedinLayout
