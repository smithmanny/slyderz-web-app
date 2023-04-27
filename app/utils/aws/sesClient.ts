import { SESClient } from "@aws-sdk/client-ses";

const REGION = "us-east-1";

const ses = new SESClient({
  region: REGION,
});

export default ses;
