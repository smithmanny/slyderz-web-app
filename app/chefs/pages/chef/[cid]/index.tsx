import React from "react"
import { Image, useRouter } from "blitz"

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

const ChefProfileAvatar = styled(Avatar)`
  & .MuiAvatar-img {
    object-position: top center;
  }
`

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

export const ChefPage = (props) => {
  const router = useRouter();

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
      <Grid container>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <div style={{ height: 250, maxHeight: 250, width: '100%', position: 'relative' }}>
            <Image src={Logo} layout="fill" objectFit="cover" />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChefProfileAvatar
              alt="Remy Sharp"
              sx={{
                height: 75,
                width: 75,
                mb: 2,
              }}
              src="/profile_pic.jpeg"
            />
            <Typography variant="h1">Shakhor Smith</Typography>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Chef tabs"
              sx={{ my: 4 }}
            >
              <Tab label="Menu" {...a11yProps(0)} />
              <Tab label="Reviews" {...a11yProps(1)} />
              <Tab label="Photos" {...a11yProps(2)} />
            </Tabs>
          </div>
        </Grid>
        <Grid item xs>
          <TabPanel value={value} index={0}>
            <Menu dishes={dishes} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

ChefPage.getLayout = (page) => <Layout title="Chef name">{page}</Layout>

export default ChefPage;