import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Image from "next/image";

import { trpc } from "server/utils/trpc";
import useUser from "app/hooks/useUser";

import Layout from "app/layouts/Layout";
import AboutSection from "app/host/components/AboutSection";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Button from "app/core/components/shared/Button";
import styles from "app/host/style.module.css";

const Host = () => {
  const router = useRouter();
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const createChef = trpc.chef.createChef.useMutation({
    onSuccess: async (url) => {
      await router.push(url);
    },
    onError: (err) => {
      return enqueueSnackbar(err.message, { variant: "error" });
    },
  });

  const handleCreateChef = async () => {
    try {
      await createChef.mutateAsync();
    } catch (err) {
      //TODO open auth modal
      console.log("FAILED", err);
    }
  };

  let showSignupChefButton = false;

  if ((user && !user.chef.isChef) || !user) {
    showSignupChefButton = true;
  }

  return (
    <ConsumerContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h1">Become a host with Slyderz</Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex" }}>
              <Image
                alt="Show your skilla"
                src="/apron.svg"
                height={35}
                width={35}
                style={{
                  marginRight: 2,
                }}
              />
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Showcase your cooking skills
              </Typography>
            </div>
            <Typography variant="subtitle2">
              Chefs have a platform to showcase their skills and create unique
              menus. Connect with new clients and grow your business with access
              to our customer base.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex" }}>
              <Image
                alt="You're in control"
                src="/no-document.svg"
                height={35}
                width={35}
                style={{
                  marginRight: 2,
                }}
              />
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Flexibility. No Contracts.
              </Typography>
            </div>
            <Typography variant="subtitle2">
              Work on your own terms and enjoy the freedom to manage your
              business and grow your culinary career without any contracts.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex" }}>
              <Image
                alt="Instant payments"
                src="/dollar.svg"
                height={35}
                width={35}
                style={{
                  marginRight: 2,
                }}
              />
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Instant payments
              </Typography>
            </div>
            <Typography variant="subtitle2">
              With Slyderz, chefs receive instant payments after completing a
              booking. Say goodbye to waiting for payouts!
            </Typography>
          </Grid>
        </Grid>
        <AboutSection
          title="How it works"
          component={
            <>
              <Typography variant="subtitle2">
                Slyderz provides a platform to showcase their talents, connect
                with new clients, and grow their business. Our chefs have access
                to a dashboard where they can:
              </Typography>
              <ul className={styles.list}>
                <li>
                  <Typography variant="subtitle2">
                    Manage their availability
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    Create and update their menus
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">
                    Track their bookings
                  </Typography>
                </li>
              </ul>
              <Typography variant="subtitle2">
                Plus, our platform makes it easy for chefs to receive payment
                and manage their finances, so they can focus on what they do
                best - <strong>cooking delicious food.</strong>
              </Typography>
              <br />
              <Typography variant="subtitle2">
                As a personal chef for Slyderz, you&apos;ll be tasked with
                cooking your favorite meals in homes around you. The typical
                time our chefs are at a client&apos;s home is typically 60-75
                minutes.
              </Typography>
              <Typography variant="subtitle2">
                Before the customer event, Slyderz will pay-out 20% of the money
                upfront to the chef to get the necessary ingredients and
                groceries, the remainder will be paid out upon completion of the
                event. You&apos;ll bring the cookware (pots, pans, knives, etc)
                while the client provides the appliances and serve-ware.
              </Typography>
              <br />
              <Typography variant="subtitle2">
                You&apos;ll also be responsible for creating your own menu and
                setting your own prices. You keep 85% of the check and 100% of
                tips. The 15% we collect allows us to fund our advertisement
                budget, customer support, payment processing, etc.
              </Typography>
            </>
          }
          MainProps={{
            sx: {
              my: 8,
            },
          }}
        />

        {showSignupChefButton && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">All sounds good to you?</Typography>
            <Button
              label="Become a host"
              sx={{ mt: 2 }}
              onClick={handleCreateChef}
            >
              Become a host
            </Button>
          </Grid>
        )}
      </Grid>
    </ConsumerContainer>
  );
};

export default Host;
Host.getLayout = (page) => <Layout title="Become a host">{page}</Layout>;
