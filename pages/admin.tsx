import type { GetServerSidePropsContext } from "next";
import { useSnackbar } from "notistack";

import { auth } from "integrations/auth/lucia";
import { trpc } from "server/utils/trpc";

import Layout from "app/layouts/Layout";
import { NoSSrConsumerContainer } from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { Select } from "app/core/components/form";
import { RoleType } from "@prisma/client";
import { ConvertUserToChefManually } from "app/beta/validations";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const authRequest = auth.handleRequest(ctx);
  const { user } = await authRequest.validateUser();

  if (user.role !== RoleType.ADMIN) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const AdminPage = () => {
  const { data } = trpc.admin.fetchAllCustomers.useQuery();
  const convertUserToChef = trpc.admin.createChefManually.useMutation({
    onSuccess: () =>
      enqueueSnackbar("User converted to Chef", {
        variant: "success",
      }),
  });
  const allCustomers = data || [""];
  const { enqueueSnackbar } = useSnackbar();

  return (
    <NoSSrConsumerContainer maxWidth="sm">
      <Form
        id="slyderz-convert-user-to-chef-manually"
        submitText="Convert user"
        schema={ConvertUserToChefManually}
        mutation={{
          schema: convertUserToChef.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <Grid item xs={12}>
          <>
            <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
              Convert user to chef
            </Typography>
            <Select
              label="Select customer"
              name="userId"
              items={allCustomers?.map((user) => ({
                label: user.name,
                value: user.id,
              }))}
              variant="outlined"
              md={12}
              required
            />
          </>
        </Grid>
      </Form>
    </NoSSrConsumerContainer>
  );
};

AdminPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AdminPage;
