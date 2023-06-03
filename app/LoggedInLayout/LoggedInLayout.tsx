import Link from "next/link";
import { trpc } from "server/utils/trpc";

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";

const NearbyChefs = (props) => {
  const { data } = trpc.chef.fetchNearbyChefs.useQuery();

  return (
    <>
      {data?.map((chef, index) => (
        <Grid
          key={`${chef.user.name}-${index}`}
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
        >
          <Link href={`chefs/${"cid"}`}>
            <Card sx={{ maxWidth: 245, margin: "auto" }}>
              <CardMedia
                image="/headshot.jpeg"
                title="Chef dish"
                sx={{
                  borderRadius: "50%",
                  width: 175,
                  height: 175,
                  margin: "auto",
                  objectFit: "contain",
                  objectPosition: "50% 50%",
                }}
              />
              <CardContent>
                <Typography variant="body1">BBQ • Atlanta</Typography>
                <Typography variant="h6">{chef.user.name}</Typography>
                <Typography variant="subtitle2">
                  Starting at $17/person
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </>
  );
};

const LoggedinLayout = () => {
  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          container
          spacing={2}
          sx={{
            minHeight: "250px",
            textAlign: "center",
            mb: { xs: 5, md: 10 },
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{ fontWeight: "bold" }}
              marginBottom={1}
            >
              Unforgettable Dining with Slyderz
            </Typography>
            <Typography variant="h6">
              Enjoy the convenience of restaurant-quality meals cooked in your
              home.
            </Typography>

            <Link href="/about">
              <Button
                sx={{ mt: 4, textTransform: "uppercase" }}
                variant="outlined"
                label="learn-more"
              >
                Learn More
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Nearby Chefs
          </Typography>
        </Grid>
        <NearbyChefs />
      </Grid>
    </ConsumerContainer>
  );
};

export default LoggedinLayout;
