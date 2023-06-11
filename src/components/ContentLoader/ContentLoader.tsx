import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Props } from './types';

const ContentLoader: FC<Props> = ({ size }) => {
  return (
    <Box display="flex" justifyContent="center" alignContent="center" mt={15}>
      <CircularProgress size={size || 75} />;
    </Box>
  );
};

export default ContentLoader;
