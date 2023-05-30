import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createServerSideHelpers } from '@trpc/react-query/server';

import Logo from "public/logo.png";
import { styled } from "integrations/material-ui";
import { trpc } from "server/utils/trpc";
import createContext from "server/utils/createContext";
import { appRouter } from "server/routers/_app";

import Avatar from "app/core/components/shared/Avatar";
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

  const chefId = ctx.query?.cid as string

  if (!chefId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const chefDishes = await helpers.chef.fetchChefDishes.fetch(chefId)

  // TODO: Show component with nearby chefs for invalid chef id's
  if (!chefDishes?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      trpcState: helpers.dehydrate(),
      chefId
    }
  }

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
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { chefId } = props;
  const { data, isLoading } = trpc.chef.fetchChefDishes.useQuery(chefId)

  if (isLoading) return null;

  const chefName = data?.user?.name;

  return (
    <ConsumerContainer>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <div
            style={{
              height: 250,
              maxHeight: 250,
              width: "100%",
              position: "relative",
            }}
          >
            <Image src={Logo} alt="Logo" />
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
            <ChefProfileAvatar
              alt="Remy Sharp"
              sx={{
                height: 100,
                width: 100,
                mb: 2,
              }}
              src="/profile_pic.jpeg"
            />
            <Typography variant="h1" fontWeight="bold">
              {chefName}
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
            {/* <CartSummary
              buttonText="Checkout"
              chefId={cid}
              hours={data.hours}
            /> */}
          </Grid>
          <Grid item xs>
            <TabPanel value={value} index={0}>
              {/* <Menu dishes={data.dishes} /> */}
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
