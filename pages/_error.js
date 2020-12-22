import React from "react";

const errorStyles = (theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "850px",
    margin: "auto",
    maxHeight: "500px",
    padding: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
