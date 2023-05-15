import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";

import { useAppSelector } from "integrations/redux";
import { NoSSrConsumerContainer } from "app/core/components/shared/ConsumerContainer";

import Grid from "app/core/components/shared/Grid";
import Tabs from "app/core/components/shared/Tabs";
import Tab from "app/core/components/shared/Tab";
import Layout from "app/core/layouts/Layout";
import IndexContainer from "app/dashboard/components/menu/IndexContainer";
import HoursContainer from "app/dashboard/components/hours/HoursContainer";

const DynamicOnboarding = dynamic(() => import("app/onboarding"), {
  ssr: false,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
// TODO: Handle flow from stripe -> dashboard and when users click on dashboard link
// 1. check if user is a chef
// 2. check if user finished onboarding
// a. stripe account setup for payments
// b. user uploads profile picture
// c. user adds description to profile
// d. user uploads food handler card
// e. admin reviews and approve chef
// 3. if user did not finish onboarding show onboarind flow

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`slyderz-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <React.Fragment>{children}</React.Fragment>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `slyderz-tab-${index}`,
    "aria-controls": `slyderz-tabpanel-${index}`,
  };
}

export const Dashboard = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = React.useState(0);
  const isChefProfileComplete = useAppSelector(
    (state) => state.user.chef.isChefProfileComplete
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isChefProfileComplete) {
    return <DynamicOnboarding />;
  }

  return (
    <NoSSrConsumerContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Chef tabs"
            sx={{ my: 4 }}
            orientation={matches ? "horizontal" : "vertical"}
            centered={matches ? true : false}
          >
            <Tab label="Menu" {...a11yProps(0)} />
            <Tab label="Hours" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={8}>
          <TabPanel value={value} index={0}>
            <IndexContainer />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HoursContainer />
          </TabPanel>
        </Grid>
      </Grid>
    </NoSSrConsumerContainer>
  );
};

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>;

export default Dashboard;
