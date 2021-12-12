import { Link, BlitzPage, Routes } from "blitz"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import styles from './styles';

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"


const LoggedinLayout: BlitzPage = () => {
  const classes = styles();
  return (
    <ConsumerContainer>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Link href={Routes.ChefPage({ cid: 1 })}>
            <a>
              <Card
                classes={{
                  root: classes.card,
                }}
              >
                <CardMedia
                  classes={{
                    root: classes.cardMedia,
                  }}
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                classes={{ root: classes.cardMediaRoot }}
                className={classes.cardContent}
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
              <Card
                classes={{
                  root: classes.card,
                }}
              >
                <CardMedia
                  classes={{
                    root: classes.cardMedia,
                  }}
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                classes={{ root: classes.cardMediaRoot }}
                className={classes.cardContent}
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
              <Card
                classes={{
                  root: classes.card,
                }}
              >
                <CardMedia
                  classes={{
                    root: classes.cardMedia,
                  }}
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                classes={{ root: classes.cardMediaRoot }}
                className={classes.cardContent}
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
              <Card
                classes={{
                  root: classes.card,
                }}
              >
                <CardMedia
                  classes={{
                    root: classes.cardMedia,
                  }}
                  image="/logo.png"
                  title="Chef dish"
                />
                <CardContent
                classes={{ root: classes.cardMediaRoot }}
                className={classes.cardContent}
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

LoggedinLayout.getLayout = (page) => <Layout title="Logged In">{page}</Layout>

export default LoggedinLayout
