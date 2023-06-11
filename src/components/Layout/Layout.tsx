import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Header } from '../common/header';
import { useSelf } from '../../hooks/useSelf';
import PageLoader from '../PageLoader';

export const Layout = () => {
  const { isLoading } = useSelf();

  return (
    <>
      <Header />
      {isLoading ? (
        <PageLoader open={isLoading} />
      ) : (
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      )}
    </>
  );
};
