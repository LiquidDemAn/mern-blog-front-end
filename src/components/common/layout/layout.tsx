import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

export const Layout = () => {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Outlet />
			</Container>
		</>
	);
};
