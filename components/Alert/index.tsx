import React from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

interface IAlertProps {
  open: boolean;
  position?: SnackbarOrigin;
  onClose?: () => void;
  message?: string;
  duration?: number;
  color?: 'success' | 'warning' | 'error' | 'info';
}

const Alert = ({
  open,
  position = { horizontal: 'left', vertical: 'bottom' },
  onClose,
  message = 'NON - Message',
  duration = 4000,
  color = 'success',
}: IAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: position.vertical,
        horizontal: position.horizontal,
      }}
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      message={message}
      key={position.vertical + position.horizontal}
    />
  );
};

export default Alert;
