import { Heading, Hr, Img, Link, Section, Text } from "@react-email/components";
import * as React from "react";

import SlyderzEmailLayout from "./index";
import EmailButton from "./components/EmailButton";

interface EmailActivateAccountProps {
  activationUrl: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_URL}`
    : "";

export const EmailActivateAccount = ({
  activationUrl,
}: EmailActivateAccountProps) => {
  return (
    <SlyderzEmailLayout previewText="Activate email">
      <Section className="mt-[32px]">
        <Img
          src={`${baseUrl}/logo.png`}
          width="40"
          height="37"
          alt="Slyderz"
          className="my-0 mx-auto"
        />
      </Section>
      <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
        Welcome to <strong>Slyderz</strong>
      </Heading>
      <Text className="text-black text-[14px] leading-[24px]">
        Please click the button below to activate your account.
      </Text>

      <Section className="text-center mt-[32px] mb-[32px]">
        <EmailButton link={activationUrl}>Activate your account</EmailButton>
      </Section>
      <Text className="text-black text-[14px] leading-[24px]">
        or copy and paste this URL into your browser:{" "}
        <Link href={activationUrl} className="text-blue-600 no-underline">
          {activationUrl}
        </Link>
      </Text>
      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
      <Text className="text-[#666666] text-[12px] leading-[24px]">
        If you were not expecting this email, you can ignore it. If you are
        concerned about your account&apos;s safety, please reply to this email
        to get in touch with us.
      </Text>
    </SlyderzEmailLayout>
  );
};

export default EmailActivateAccount;
