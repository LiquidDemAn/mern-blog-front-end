import { useContext } from 'react';
import { authContext } from 'contexts/authContext';

export const useSelf = () => {
  return useContext(authContext);
};
