import { Section, Text } from "@react-email/components";
import * as React from "react";

import SlyderzEmailLayout from "emails";
import EmailButton from "./components/EmailButton";

interface EmailForgotPasswordEmailProps {
  resetPasswordUrl: string;
}

export const EmailForgotPasswordEmail = ({
  resetPasswordUrl,
}: EmailForgotPasswordEmailProps) => {
  return (
    <SlyderzEmailLayout previewText="You requested to change your password.">
      <Section>
        <Text style={text}>
          Someone recently requested a password change for your Slyderz account.
          If this was you, you can set a new password here:
        </Text>
        <EmailButton style={button} link={resetPasswordUrl}>
          Reset password
        </EmailButton>
        <Text style={text}>
          If you don&apos;t want to change your password or didn&apos;t request
          this, just ignore and delete this message.
        </Text>
        <Text style={text}>
          To keep your account secure, please don&apos;t forward this email to
          anyone.
        </Text>
      </Section>
    </SlyderzEmailLayout>
  );
};

export default EmailForgotPasswordEmail;

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
