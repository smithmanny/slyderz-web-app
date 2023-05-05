import { ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { default as MuiAppBar } from "@mui/material/AppBar";

import { theme } from "integrations/material-ui";
import type { Breakpoint } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "app/core/components/shared/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Toolbar from "@mui/material/Toolbar";


interface ModalType {
  actions?: any
  children: ReactNode
  size?: Breakpoint
  title?: string
  show: boolean
  closeModal: () => void
}

const Modal = ({ actions, children, size, title, show, closeModal }: ModalType) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      aria-labelledby={title || "slyderz-modal-title"}
      aria-describedby="slyderz-modal-description"
      fullWidth={true}
      fullScreen={fullScreen}
      maxWidth={size}
      open={show}
      onClose={closeModal}
      scroll="paper"
      disablePortal
    >
      <MuiAppBar
        color="transparent"
        position="relative"
        sx={{ boxShadow: "none" }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      {title && <DialogTitle id={title || "slyderz-modal-title"} sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>}
      <DialogContent sx={{ minHeight: '300px' }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.defaultProps = {
  actions: null,
  size: "sm",
  title: "",
};

Modal.propTypes = {
  actions: PropTypes.element,
  closeModal: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default Modal;
