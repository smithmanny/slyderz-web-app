import { default as MuiButton } from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';


const Button = ({ children, ...props }) => {
  const { ariaLabel, type } = props;
  switch(type) {
    case 'icon':
      return (
        <IconButton aria-label={ariaLabel} {...props} size="large">
          {children}
        </IconButton>
      );
    default:
      return (
        <MuiButton
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </MuiButton>
      )
  }
}

Button.defaultProps = {
  ariaLabel: 'button',
  type: 'default',
  variant: "contained"
}

Button.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(["icon", "default"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained", undefined])
}

export default Button;
