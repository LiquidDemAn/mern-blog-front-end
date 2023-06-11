import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Props } from './types';

const ContentLoader: FC<Props> = ({ size, wrapperClasses }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      className={wrapperClasses}
    >
      <CircularProgress size={size || 50} />
    </Box>
  );
};

export default ContentLoader;
