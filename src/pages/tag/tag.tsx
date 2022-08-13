import { useParams } from 'react-router-dom';

export const Tag = () => {
	const { tag } = useParams();

	return (
		<div>
			<h2>#{tag}</h2>
		</div>
	);
};
