import { useParams } from "blitz"

import Avatar from "app/core/components/shared/Avatar"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Menu from "app/chefs/components/menu"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

export const ConfirmationPage = (props) => {
  const params = useParams();

  return (
    <ConsumerContainer>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
          textTransform: 'capitalize'
        }}
      >
        Thanks for your order
      </Typography>
      <Typography variant="h6" gutterBottom><b>Order Details:</b> {params.cid}</Typography>
      <Typography variant="h6" gutterBottom><b>Order Number:</b> {params.cid}</Typography>
      <Typography variant="h6" gutterBottom><b>Order Location:</b> 4288 Leola Road, Douglasville, GA, 30135</Typography>
      <Typography variant="h6" gutterBottom><b>Order Time:</b> 6:00 PM</Typography>

      <Typography variant="h6">Order Summary:</Typography>
    </ConsumerContainer>
  );
};

ConfirmationPage.getLayout = (page) => <Layout title="Order Reserved">{page}</Layout>

export default ConfirmationPage;
