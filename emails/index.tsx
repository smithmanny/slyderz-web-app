import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

import EmailFooter from "./components/Footer";
import EmailHeader from "./components/Header";

interface SlyderzEmailLayoutProps {
  previewText: string;
  children: React.ReactNode;
  style?: any;
}

export const SlyderzEmailLayout = ({
  previewText = "This is the preview text",
  style,
  children,
}: SlyderzEmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container
            className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px]"
            style={style}
          >
            <EmailHeader />
            {children}
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SlyderzEmailLayout;
