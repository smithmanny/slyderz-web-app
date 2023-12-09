import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import Layout from "app/layouts/Layout";
import Form, { TextField } from "app/components/form";
import { trpc } from "server/utils/trpc";
import { AddUserToMailjet } from "validations/betaValidations";

const Subscribe = () => {
  const { enqueueSnackbar } = useSnackbar();
  const addUserToMailjet = trpc.beta.addUserToMailjet.useMutation({
    onSuccess: ({ message }) =>
      enqueueSnackbar(message, {
        variant: "success",
      }),
  });

  return (
    <Box sx={{ display: "flex", maxWidth: 500, m: "auto", mt: 4 }}>
      <Form
        style={{ flex: 1 }}
        submitText="Subscribe"
        schema={AddUserToMailjet}
        mutation={{
          schema: addUserToMailjet.mutateAsync,
          toVariables: (values) => ({
            ...values,
          }),
        }}
      >
        <TextField
          name="email"
          label="Enter your email"
          InputProps={{
            sx: {
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        />
      </Form>
    </Box>
  );
};

Subscribe.getLayout = (page) => <Layout>{page}</Layout>;
export default Subscribe;
