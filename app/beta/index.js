import Box from "@mui/material/Box";
import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Subscribe from './components/Subscribe'
import HowItWorks from "./components/HowItWorks";
import RocketIcon from "app/core/components/icons/Rocket";
import './styles.css'

const BetaContainer = () => {
  return (
    <ConsumerContainer>
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", textAlign: 'center' }}
      >
        <Box component="span" sx={{ color: 'primary.main' }}>Slyderz</Box> is Coming Soon!
      </Typography>

      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontWeight: 545, maxWidth: 565, margin: 'auto', textAlign: 'center' }}>
          Are you ready for a revolutionary dining experience? Slyderz is bringing the magic of personal chefs to your doorstep.
        </Typography>

        <Subscribe />
      </Box>

      <section>
        <div style={{ textAlign: 'center', paddingTop: 80 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', paddingBottom: 4 }}>How it works</Typography>
          <HowItWorks />
        </div>
      </section>

      <section>
        <Grid container sx={{ paddingTop: 15 }} spacing={2}>
          <Grid item xs={12} md={6}>
            <RocketIcon />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Why Slyderz?</Typography>
            <ol className="ordered-list">
              <li>
                <Typography><strong>Unforgettable Experiences:</strong> Transform ordinary meals into extraordinary moments, right in the comfort of your own home.</Typography>
              </li>
              <li>
                <Typography><strong>Griderse Culinary Delights:</strong> Explore a world of flavors with our wide range of talented chefs, each with their own expertise.</Typography>
              </li>
              <li>
                <Typography>
                  <strong>Flexibility and Convenience:</strong> From special occasions to everyday indulgence, Slyderz gives you the freedom to curate your culinary journey.
                </Typography>
              </li>
            </ol>
          </Grid>
        </Grid>
      </section>
    </ConsumerContainer>
  );
};

BetaContainer.getLayout = (page) => <Layout>{page}</Layout>;
export default BetaContainer;
