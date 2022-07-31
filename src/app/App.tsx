import { Container } from '@mui/system';
import { Header } from '../components/header';
import { CreatePost } from '../pages/create-post';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Registration } from '../pages/registration';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				{/* <Home /> */}
				{/* <FullPost /> */}
				{/* <CreatePost /> */}
				{/* <Registration /> */}
				{/* <Login /> */}
			</Container>
		</>
	);
}

export default App;
