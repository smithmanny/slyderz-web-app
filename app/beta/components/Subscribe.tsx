import Box from "@mui/material/Box";
import Layout from "app/layouts/Layout";
import Button from "app/core/components/shared/Button";
import Form, { TextField } from "app/core/components/form";

const Subscribe = () => {
  return (
    <Box sx={{ display: "flex", maxWidth: 500, m: "auto", mt: 4 }}>
      <Form style={{ flex: 1 }}>
        <TextField
          name="subscribe"
          label="Enter your email"
          InputProps={{
            sx: {
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        />
      </Form>

      <Button
        label="subscribe"
        sx={{
          minWidth: 100,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
        }}
      >
        Subscribe
      </Button>
    </Box>
  );
};

Subscribe.getLayout = (page) => <Layout>{page}</Layout>;
export default Subscribe;
