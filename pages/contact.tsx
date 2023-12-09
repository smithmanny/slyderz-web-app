import { useState, useEffect, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import Layout from "app/layouts/Layout";
import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";
import Form, { TextField } from "app/components/form";

const Contact = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    if (captchaToken) console.log(`hCaptcha Token: ${captchaToken}`);
  }, [captchaToken]);
  return (
    <ConsumerContainer maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h1">Contact Us</Typography>
        </Grid>
        <Grid item xs={12}>
          <Form
            submitText="Submit"
            onSubmit={(values) => {
              if (captchaRef.current) {
                captchaRef.current.execute();
              }

              console.log("VALUES", values);
            }}
          >
            <TextField
              autoComplete="given-name"
              name="firstName"
              label="First Name"
              md={6}
            />
            <TextField
              autoComplete="family-name"
              name="lastName"
              label="Last Name"
              md={6}
            />
            <TextField
              autoComplete="email"
              name="email"
              label="Email"
              md={12}
              type="email"
            />
            <TextField
              name="message"
              label="Message"
              md={12}
              multiline
              minRows={5}
            />
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY || ""}
              size="invisible"
              onVerify={setCaptchaToken}
              ref={captchaRef}
            />
          </Form>
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

export default Contact;
Contact.getLayout = (page) => <Layout title="Contact | Slyderz">{page}</Layout>;
