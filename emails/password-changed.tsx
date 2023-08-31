import { Section, Text } from "@react-email/components";
import * as React from "react";

import SlyderzEmailLayout from "emails";

export const EmailPasswordChangedEmail = () => {
  return (
    <SlyderzEmailLayout previewText="You requested to change your password.">
      <Section>
        <Text style={text}>
          Your password has been changed. If this wasn&apos;t you, please email
          us immediately.
        </Text>
      </Section>
    </SlyderzEmailLayout>
  );
};

export default EmailPasswordChangedEmail;

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
