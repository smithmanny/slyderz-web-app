import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import { default as MuiAppBar } from "@mui/material/AppBar";

import { theme } from 'integrations/material-ui';

import Button from 'app/core/components/shared/Button'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from 'app/core/components/shared/IconButton'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';

const Modal = ({ actions, children, size, title, show, closeModal }) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      fullWidth={true}
      fullScreen={fullScreen}
      maxWidth={size}
      open={show}
      onClose={closeModal}
      scroll="paper"
    >
      <MuiAppBar
        color='transparent'
        position='relative'
        sx={{ boxShadow: 'none' }}
      >
        <Toolbar variant='dense' sx={{ justifyContent: 'flex-end' }}>
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
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

Modal.defaultProps = {
  actions: null,
  size: 'sm',
  title: ''
}

Modal.propTypes = {
  actions: PropTypes.element,
  closeModal: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default Modal;