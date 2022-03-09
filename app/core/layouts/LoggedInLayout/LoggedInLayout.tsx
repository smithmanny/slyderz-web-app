import { Link, BlitzPage, Routes } from "blitz"
import { Global, css } from '@emotion/react'

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

const LoggedinLayout: BlitzPage = () => {
  return (
    <ConsumerContainer>
      <Global
        styles={css`
          .MuiCard-root {
            background: transparent;
            box-shadow: none;
            max-width: 308px;
          }

          .MuiCardContent-root {
            padding-top: 8px;
          }
        `}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Link href={Routes.ChefPage({ cid: 1 })}>
            <a>
              <Card>
                <CardMedia
                  image="/logo.png"
                  component="img"
                  height="140"
                  title="Chef dish"
                />
                <CardContent
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
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link href="/chef/1">
            <a>
              <Card>
                <CardMedia
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                  sx={{
                    paddingLeft: 0,
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
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link href="/chef/1">
            <a>
              <Card>
                <CardMedia
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                  sx={{
                    paddingLeft: 0,
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
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Link href="/chef/1">
            <a>
              <Card>
                <CardMedia
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                  sx={{
                    paddingLeft: 0,
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
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
      </Grid>
    </ConsumerContainer>
  )
}

LoggedinLayout.getLayout = (page) => (
  <Layout title="Logged In">
    {page}
  </Layout>
)

export default LoggedinLayout
