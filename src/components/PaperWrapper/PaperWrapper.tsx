import { FC, PropsWithChildren } from 'react';
import { Typography, Paper } from '@mui/material';

export const PaperWrapper: FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children
}) => {
  return (
    <Paper className="p-5">
      {title && (
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};
