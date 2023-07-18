import { Text, Section } from "@react-email/components";
import * as React from "react";

export const EmailHeader = () => {
  return (
    <Section className="mt-[32px]">
      <Text style={title}>Slyderz</Text>
    </Section>
  );
};

export default EmailHeader;

const title = {
  fontSize: "32px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "bold",
  color: "#404040",
  lineHeight: "26px",
};
