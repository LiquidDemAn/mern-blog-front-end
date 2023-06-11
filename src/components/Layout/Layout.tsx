import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { useSelf } from '../../hooks/useSelf';
import PageLoader from '../PageLoader';

const Layout = () => {
  const { isLoading } = useSelf();

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
      <PageLoader open={isLoading} />
    </>
  );
};

export default Layout;
