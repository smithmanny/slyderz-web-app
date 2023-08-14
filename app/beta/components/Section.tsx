import { ReactNode } from "react";
import Box from "@mui/material/Box";

type BetaSectionType = {
  children: ReactNode;
  color?: string;
};
const BetaSection = ({ children, color }: BetaSectionType) => {
  return (
    <Box sx={{ minHeight: 350, color: color ? color : "inherit" }}>
      {children}
    </Box>
  );
};

export default BetaSection;
