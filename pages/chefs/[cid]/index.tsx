import React from "react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { CldImage } from "next-cloudinary";

import { styled } from "integrations/material-ui";
import { trpc } from "server/utils/trpc";
import createContext from "server/utils/createContext";
import { appRouter } from "server/routers/_app";

import Avatar from "app/core/components/shared/Avatar";
import Box from "app/core/components/shared/Box";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Menu from "app/chefs/components/menu";
import Grid from "app/core/components/shared/Grid";
import Tabs from "app/core/components/shared/Tabs";
import TabPanel from "app/core/components/shared/TabPanel";
import Tab from "app/core/components/shared/Tab";
import Typography from "app/core/components/shared/Typography";
import Layout from "app/core/layouts/Layout";
import CartSummary from "app/core/components/cart/cartSummary";

export async function getServerSideProps(ctx) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
  });

  const chefId = ctx.query?.cid as string;

  if (!chefId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  await helpers.chef.fetchChefPublicProfile.prefetch(chefId);

  return {
    props: {
      trpcState: JSON.stringify(helpers.dehydrate()),
      chefId,
    },
  };
}

const ChefProfileAvatar = styled(Avatar)`
  & .MuiAvatar-img {
    object-position: top center;
  }
`;

function a11yProps(index: number) {
  return {
    id: `slyderz-tab-${index}`,
    "aria-controls": `slyderz-tabpanel-${index}`,
  };
}

export const ChefPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { chefId } = props;
  const { data, isLoading } = trpc.chef.fetchChefPublicProfile.useQuery(chefId);

  if (isLoading || !data?.chefName) return null;

  return (
    <ConsumerContainer>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <div
            style={{
              height: 360,
              maxHeight: 360,
              width: "100%",
              position: "relative",
            }}
          >
            <CldImage
              src="https://res.cloudinary.com/slyderz/image/upload/v1686420045/dcdp5lc26pzvv8xlpfui.png"
              sizes="100vw"
              alt="chef bg picture"
              fill
              priority
            />
            <Box
              sx={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                bottom: "-55px",
                left: 0,
                right: 0,
              }}
            >
              {data.chefImage ? (
                <CldImage
                  width="150"
                  height="150"
                  src={data.chefImage}
                  sizes="100vw"
                  alt="chef profile picture"
                  priority
                />
              ) : (
                <ChefProfileAvatar
                  alt="chef profile picture"
                  sx={{
                    height: 150,
                    width: 150,
                    mb: 2,
                  }}
                  src="/profile_pic.jpeg"
                />
              )}
            </Box>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" fontWeight="bold">
              {data.chefName}
            </Typography>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Chef tabs"
              sx={{ my: 4 }}
            >
              <Tab label="Menu" {...a11yProps(0)} />
              <Tab label="Photos" {...a11yProps(2)} />
            </Tabs>
          </div>
        </Grid>
        <Grid container item xs={12} spacing={2} direction="row-reverse">
          <Grid item md={4} xs={12}>
            <CartSummary chefId={chefId} hours={data?.hours} />
          </Grid>
          <Grid item xs>
            <TabPanel value={value} index={0}>
              <Menu dishes={data.dishes} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

ChefPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ChefPage;
