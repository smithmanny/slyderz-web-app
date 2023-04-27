import { BlitzPage } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";

import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form";

const Contact: BlitzPage = () => {
  return (
    <ConsumerContainer maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h1">Contact Us</Typography>
        </Grid>
        <Grid item xs={12}>
          <Form submitText="Submit">
            <TextField name="firstName" label="First Name" md={6} />
            <TextField name="lastName" label="Last Name" md={6} />
            <TextField name="email" label="Email" md={12} type="email" />
            <TextField name="message" label="Message" md={12} multiline />
          </Form>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

export default Contact;
Contact.getLayout = (page) => <Layout title="Contact | Slyderz">{page}</Layout>;
