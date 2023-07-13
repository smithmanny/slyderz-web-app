import { SES } from "@aws-sdk/client-ses";

const REGION = "us-east-1";

const ses = new SES({
  region: REGION,
});

export default ses;
