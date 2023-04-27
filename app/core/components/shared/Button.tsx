import { FC } from "react";
import { default as MuiButton, ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

interface ButtonType extends ButtonProps {
  label: string;
  buttonType?: string;
}

const Button: FC<ButtonType> = ({ children, buttonType, label, ...props }) => {
  switch (buttonType) {
    case "icon":
      return (
        <IconButton aria-label={label} {...props} size="large">
          {children}
        </IconButton>
      );
    default:
      return (
        <MuiButton
          type={buttonType === "icon" ? "button" : "submit"}
          aria-label={label}
          {...props}
        >
          {children}
        </MuiButton>
      );
  }
};

Button.defaultProps = {
  label: "button",
  buttonType: "default",
  variant: "contained",
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(["icon", "default"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained", undefined]),
};

export default Button;
