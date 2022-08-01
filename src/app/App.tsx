import { Container } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Layout } from '../components/layout';
import { CreatePost } from '../pages/create-post';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				{/* <FullPost /> */}
				{/* <CreatePost /> */}
				{/* <Registration /> */}
				{/* <Login /> */}
			</Route>
		</Routes>
	);
}

export default App;
