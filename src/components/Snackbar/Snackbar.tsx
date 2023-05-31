import React, { useEffect, useState } from 'react';
import {
  Alert,
  Fade,
  Snackbar as MuiSnackbar,
  SnackbarCloseReason,
  SnackbarProps
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Notification, NotificationFunction, NotificationType } from './types';
import { NOTIFICATION_DURATION } from 'utils/constants';
import { ERROR_NOTIFICATION_DURATION } from 'utils/constants';

export let notification: NotificationFunction = () => {};
export let errorNotification: NotificationFunction = () => {};
export let loadingNotification: NotificationFunction = () => {};
export let closeNotification = () => {};

const Snackbar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [notificationOptionsPack, setNotificationOptionsPack] = useState<
    Notification[]
  >([]);
  const [notificationOptions, setNotificationOptions] =
    useState<Notification | null>(null);

  const isLoading = notificationOptions?.type === NotificationType.LOADING;
  const isError = notificationOptions?.type === NotificationType.ERROR;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (notificationOptions?.onClose && event && reason) {
      notificationOptions?.onClose(event, reason);
    }
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOptions(null);
    setOpen(false);
  };

  const updateNotification =
    (type: NotificationType) =>
    (
      message: string,
      heading?: string,
      messageType?: string,
      options?: SnackbarProps
    ) => {
      setNotificationOptionsPack((prevState) => [
        ...prevState,
        { ...options, message, heading, type, key: Date.now() }
      ]);
    };

  notification = updateNotification(NotificationType.DEFAULT);
  loadingNotification = updateNotification(NotificationType.LOADING);
  errorNotification = updateNotification(NotificationType.ERROR);
  closeNotification = handleClose;

  useEffect(() => {
    if (notificationOptionsPack.length && !notificationOptions) {
      // Set a new snack when we don't have an active one
      setNotificationOptions({ ...notificationOptionsPack[0] });
      setNotificationOptionsPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (notificationOptionsPack.length && notificationOptions && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [notificationOptionsPack, notificationOptions, open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <MuiSnackbar
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      ContentProps={{
        classes: {
          root: '!p-0 !bg-white',
          message: '!p-0'
        }
      }}
      open={open}
      TransitionComponent={Fade}
      autoHideDuration={
        !isLoading
          ? isError
            ? ERROR_NOTIFICATION_DURATION
            : NOTIFICATION_DURATION
          : null
      }
      {...notificationOptions}
      onClose={handleClose}
      message={
        <Alert
          onClose={handleClose}
          className="bg-red-500"
          severity={
            notificationOptions?.type === NotificationType.ERROR
              ? 'error'
              : 'success'
          }
        >
          {notificationOptions?.message}
        </Alert>
      }
    />
  );
};

export default Snackbar;
