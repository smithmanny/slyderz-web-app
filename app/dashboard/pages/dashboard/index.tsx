import React from "react"
import { Image, useRouter } from "blitz"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Logo from "public/logo.png"
import { styled } from "integrations/material-ui"

import Avatar from "app/core/components/shared/Avatar"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Menu from "app/chefs/components/menu"
import Grid from "app/core/components/shared/Grid"
import Tabs from "app/core/components/shared/Tabs"
import Tab from "app/core/components/shared/Tab"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"
import IndexContainer from "app/dashboard/components/menu/IndexContainer"

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
      {value === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `slyderz-tab-${index}`,
    'aria-controls': `slyderz-tabpanel-${index}`,
  };
}

export const Dashboard = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { cid } = router.query;
  // const { loading, error, data } = useQuery(FETCH_ALL_DISHES);
  // if (loading) return "LOADING";
  // const { dishes } = data;
  const dishes = [
    {
      id: 0,
      name: 'Deep Fried Chipotle Wings',
      description: 'This is the description',
      price: 25
    },
    {
      id: 1,
      name: 'Dish #2',
      description: 'This is the description',
      price: 25
    },
    {
      id: 2,
      name: 'Dish #3',
      description: 'This is the description',
      price: 25
    },
    {
      id: 3,
      name: 'Dish #4',
      description: 'This is the description',
      price: 100
    },
    {
      id: 4,
      name: 'Dish #5',
      description: 'This is the description',
      price: 50
    },
  ]

  return (
    <ConsumerContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Chef tabs"
            sx={{ my: 4 }}
            orientation={matches ? 'horizontal' : 'vertical'}
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
            Hours
          </TabPanel>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard;