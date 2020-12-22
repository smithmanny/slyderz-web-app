import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

import AppBar from "../appBar";
import Footer from "../footer";
import consumerContainerStyles from "./styles";

const ConsumerContainer = ({ children, ...containerProps }) => {
  const classes = consumerContainerStyles();
  return (
    <div className={classes.container}>
      <AppBar />
      <Container className={classes.content} maxWidth="xl" {...containerProps}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

ConsumerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConsumerContainer;
