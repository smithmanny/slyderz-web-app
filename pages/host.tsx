import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { trpc } from "server/utils/trpc";

import Layout from "app/core/layouts/Layout";
import AboutSection from "app/about/components/AboutSection";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Box from "app/core/components/shared/Box";
import Button from "app/core/components/shared/Button";

const Host = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const createChef = trpc.chef.createChef.useMutation({
    onSuccess: async (url) => {
      await router.push(url);
    },
    onError: (err) => {
      return enqueueSnackbar(err.message, { variant: "error" });
    },
  });

  const handleCreateChef = async () => await createChef.mutateAsync();
  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h1">Become a host with Slyderz</Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Showcase your cooking skills
              </Typography>
              <Typography variant="subtitle2">
                Chefs have a platform to showcase their skills and create unique
                menus. Connect with new clients and grow your business with
                access to our customer base.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Flexibility. No Contracts.
              </Typography>
              <Typography variant="subtitle2">
                Work on your own terms and enjoy the freedom to manage your
                business and grow your culinary career without any contracts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Instant payments
              </Typography>
              <Typography variant="subtitle2">
                With Slyderz, chefs receive instant payments after completing a
                booking. Say goodbye to waiting for payouts!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <AboutSection
          title="How it works"
          description="Slyderz provides a platform to showcase their talents, connect with new clients, and grow their business. Our chefs have access to a dashboard where they can manage their availability, create and update their menus, and track their bookings. Plus, our platform makes it easy for chefs to receive payment and manage their finances, so they can focus on what they do best - cooking delicious food."
          MainProps={{
            sx: {
              my: 8,
            },
          }}
        />

        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">Ready to get started?</Typography>
          <Button
            label="Become a host"
            sx={{ mt: 2 }}
            onClick={handleCreateChef}
          >
            Become a host
          </Button>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

export default Host;
Host.getLayout = (page) => <Layout title="Become a host">{page}</Layout>;
