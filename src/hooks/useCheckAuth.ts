import { useEffect } from 'react';
import { PathsEnum } from '../typedef';
import { getToken } from '../local-storage';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(PathsEnum.Login);
    }
  }, [token, navigate]);
};
