import { SnackbarProps } from '@mui/material';

export type NotificationFunction = (
  message: string,
  heading?: string,
  messageType?: string,
  options?: Omit<SnackbarProps, 'message'>
) => void;

export enum NotificationType {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

export type Notification = SnackbarProps & {
  heading?: string;
  type?: NotificationType;
  key: number;
};
