import { Link } from 'react-router-dom';
import { PathsEnum } from '../../typedef';

export const NotFoundPage = () => {
	return (
		<div>
			Page not found! Go to <Link to={PathsEnum.Home}>Home page</Link>.
		</div>
	);
};
