import { Container } from '@mui/system';
import { Header } from '../components/header';
import { FullPost } from '../pages/full-post';
import { Home } from '../pages/home';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				{/* <Home /> */}
				<FullPost />
			</Container>
		</>
	);
}

export default App;
