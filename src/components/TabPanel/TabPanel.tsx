import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { Props } from './types';

const TabPanel: FC<PropsWithChildren<Props>> = ({ children, index, value }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && children}
    </Box>
  );
};

export default TabPanel;
