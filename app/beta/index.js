import Box from "@mui/material/Box";
import Layout from "app/layouts/Layout";
import AboutSection from "app/about/components/AboutSection";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form";
import Subscribe from './components/Subscribe'
import BetaSection from "./components/Section";

const BetaContainer = () => {
  return (
    <ConsumerContainer>
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", textAlign: 'center' }}
      >
        Slyderz is Coming Soon!
      </Typography>

      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontWeight: 545, maxWidth: 565, margin: 'auto' }}>
          Are you ready for a revolutionary dining experience? Slyderz is bringing the magic of personal chefs to your doorstep.
        </Typography>

        <Subscribe />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">

        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

BetaContainer.getLayout = (page) => <Layout>{page}</Layout>;
export default BetaContainer;
