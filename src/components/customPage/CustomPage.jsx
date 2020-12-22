import React from "react";

import customPageStyles from "./styles";

import ConsumerContainer from "../consumerContainer";
import Typography from "../shared/Typography";

const CustomPage = ({ children, title }) => {
  const classes = customPageStyles();
  return (
    <ConsumerContainer>
      <div className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
      </div>
      {children}
    </ConsumerContainer>
  );
};

export default CustomPage;
