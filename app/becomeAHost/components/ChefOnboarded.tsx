import Link from "next/link";

import Typography from "app/core/components/shared/Typography";
import Button from "app/core/components/shared/Button";
import Box from "app/core/components/shared/Box";

interface ChefOnboardedPropType {
  stripeAccountUrl: string;
}

function ChefOnboarded(props: ChefOnboardedPropType) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        Update Payout Information
      </Typography>
      <Link href={props.stripeAccountUrl}>
        <Button label="update-chef-payout" href={props.stripeAccountUrl}>
          Update
        </Button>
      </Link>
    </Box>
  );
}

export default ChefOnboarded;
