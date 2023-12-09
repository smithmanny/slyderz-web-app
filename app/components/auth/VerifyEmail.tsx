import Link from "next/link";

import Typography from "app/components/shared/Typography";
import Box from "app/components/shared/Box";
import Button from "app/components/shared/Button";

export const VerifyEmail = () => {
  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        margin: "auto",
        maxWidth: 550,
        width: "100%",
      }}
    >
      <Typography gutterBottom variant="h4" fontWeight="bold">
        Your email has been verified!
      </Typography>

      <Link href="/">
        <Button label="go-home" variant="text">
          Go home
        </Button>
      </Link>
    </Box>
  );
};

export default VerifyEmail;
