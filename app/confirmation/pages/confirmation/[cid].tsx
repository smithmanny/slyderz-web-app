import { useRouter } from "blitz"

import styles from 'app/chefs/styles/chefPageStyles'

import Avatar from "app/core/components/shared/Avatar"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Menu from "app/chefs/components/menu"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

export const ConfirmationPage = (props) => {
  const classes = styles();

  return (
    <ConsumerContainer>
      <Paper>
    Confirmation page
      </Paper>
    </ConsumerContainer>
  );
};

ConfirmationPage.getLayout = (page) => <Layout title="Order Reserved">{page}</Layout>

export default ConfirmationPage;
