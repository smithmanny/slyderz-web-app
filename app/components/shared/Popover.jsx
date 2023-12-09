import { default as PopoverMUI } from "@mui/material/Popover";
import PropTypes from "prop-types";

const Popover = ({ anchorEl, children, onClose, name, ...props }) => {
  const open = Boolean(anchorEl);
  const id = open ? name : undefined;
  return (
    <PopoverMUI
      aria-labelledby={name}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...props}
    >
      {children}
    </PopoverMUI>
  );
};

Popover.defaultProps = {
  anchorEl: null,
  name: "Popover",
};

Popover.propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Popover;
