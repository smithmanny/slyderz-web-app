import { useRouter } from "next/router";
import db from "db";

import Box from "app/core/components/shared/Box";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Button from "app/core/components/shared/Button";
import Typography from "app/core/components/shared/Typography";
import Layout from "app/core/layouts/Layout";
import Divider from "app/core/components/shared/Divider";

import { TRANSACTIONAL_EMAILS } from "types";
import sendSesEmail from "emails/utils/sendSesEmail";

export const getServerSideProps = async function getServerSideProps({
  req,
  res,
  params,
}) {
  const confirmationNumber = String(params?.oid);

  if (!confirmationNumber) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const order = await db.order.findFirstOrThrow({
    where: {
      confirmationNumber,
    },
    select: {
      amount: true,
      confirmationNumber: true,
      eventDate: true,
      eventTime: true,
      orderStatus: true,
      items: {
        include: {
          dish: {
            select: {
              description: true,
              name: true,
            },
          },
        },
      },
      chefId: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (order.orderStatus !== "PENDING") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await db.order.update({
    where: {
      confirmationNumber,
    },
    data: {
      orderStatus: "DECLINED",
    },
  });

  await sendSesEmail({
    to: order.user.email,
    type: TRANSACTIONAL_EMAILS.denyOrder,
    variables: {
      orderNumber: order.confirmationNumber,
    },
  });

  return {
    props: {
      order: JSON.stringify(order),
    },
  };
};

export const DenyOrderPage = (props) => {
  const router = useRouter();
  return (
    <ConsumerContainer maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">This order has been declined.</Typography>
        <Divider
          sx={{
            marginBottom: 2,
          }}
        />

        <Button
          label="go-back-home"
          onClick={() => router.replace("/")}
          sx={{
            p: 2,
            maxWidth: 400,
            width: "100%",
            mt: 2,
          }}
        >
          Go back home
        </Button>
      </Box>
    </ConsumerContainer>
  );
};

DenyOrderPage.getLayout = (page) => (
  <Layout title="Order not accepted">{page}</Layout>
);

export default DenyOrderPage;
