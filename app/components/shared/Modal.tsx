import { ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { default as MuiAppBar } from "@mui/material/AppBar";
import { CldImage } from "next-cloudinary";

import { theme } from "integrations/material-ui";
import type { Breakpoint } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "app/components/shared/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Toolbar from "@mui/material/Toolbar";
import Box from "app/components/shared/Box";

interface ModalType {
  actions?: any;
  children: ReactNode;
  size?: Breakpoint;
  title?: string;
  show: boolean;
  closeModal: () => void;
  imageUrl?: string;
}

const Modal = ({
  actions,
  children,
  size,
  title,
  show,
  imageUrl,
  closeModal,
}: ModalType) => {
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
        sx={{ boxShadow: "none", position: "relative" }}
      >
        <Toolbar
          variant="dense"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 99,
          }}
        >
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
      {title && (
        <DialogTitle
          id={title || "slyderz-modal-title"}
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </DialogTitle>
      )}
      {imageUrl && (
        <Box
          sx={{
            marginBottom: 2,
            position: "relative",
            height: "325px",
            width: "100%",
          }}
        >
          <CldImage
            sizes="50vw"
            alt="Dish photo"
            fill
            src={imageUrl}
            priority
          />
        </Box>
      )}
      <DialogContent sx={{ minHeight: "300px" }}>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ mb: 2, mr: 2 }}>{actions}</DialogActions>
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
