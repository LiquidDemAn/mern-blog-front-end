import { Container } from '@mui/system';
import { Header } from '../components/header';
import { Home } from '../pages/home';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Home />
			</Container>
		</>
	);
}

export default App;
