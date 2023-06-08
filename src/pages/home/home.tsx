import { useAppSelector } from 'redux/store/hooks';
import { useEffect, useState, SyntheticEvent } from 'react';
import { getPostsLoading } from 'redux/services/posts/selectors';
import { PathsEnum, TabsEnum } from 'typedef';
import { Loader } from 'components/common/loader';
import { HomeView } from './view';
import { getToken } from 'local-storage';
import { useNavigate } from 'react-router-dom';
import { useSelf } from 'hooks/useSelf';

export const Home = () => {
  const navigate = useNavigate();

  const { self } = useSelf();

  const token = getToken();

  const [value, setValue] = useState(TabsEnum.New);

  const loading = useAppSelector(getPostsLoading);

  const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!token) {
      navigate(PathsEnum.Login);
    }
  }, [token, navigate]);

  return (
    <>
      <HomeView
        userName={self?.fullName}
        value={value}
        handleChange={handleChange}
      />

      <Loader open={loading} />
    </>
  );
};
