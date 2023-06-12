import React, { FC, PropsWithChildren } from 'react';
import {
  Dialog as MuiDialog,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import { Props } from './types';
import { Close } from '@mui/icons-material';
import clsx from 'clsx';

const Dialog: FC<PropsWithChildren<Props>> = ({
  children,
  open,
  handleClose,
  title,
  large,
  extraLarge,
  dialogClasses
}) => {
  return (
    <MuiDialog
      maxWidth={large ? 'lg' : extraLarge ? 'xl' : 'xs'}
      classes={{
        paper: clsx(
          'relative rounded-lg w-full min-w-[288px] p-4 overflow-x-hidden',
          extraLarge && 'm-4',
          dialogClasses
        )
      }}
      open={open}
      onClose={handleClose}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {title && <Typography variant="h5">{title}</Typography>}
        <IconButton
          onClick={handleClose}
          className={clsx(!title && 'absolute z-10 top-2 right-2')}
        >
          <Close />
        </IconButton>
      </Box>

      {children}
    </MuiDialog>
  );
};

export default Dialog;
