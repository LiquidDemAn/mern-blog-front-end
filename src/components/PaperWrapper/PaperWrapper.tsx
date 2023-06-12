import { FC, PropsWithChildren } from 'react';
import { Typography, Paper, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Props } from 'components/PaperWrapper/types';

const PaperWrapper: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  isCloseShow = false,
  handleClose
}) => {
  return (
    <Paper className="p-5">
      {title && (
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">{title}</Typography>
          {isCloseShow && (
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
      {children}
    </Paper>
  );
};

export default PaperWrapper;
