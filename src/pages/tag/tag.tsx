import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadPostsByTag } from '../../redux/services/posts/actions';
import { useAppDispach } from '../../redux/store/hooks';

export const Tag = () => {
	const { tag } = useParams();
	const dispatch = useAppDispach();

	useEffect(() => {
		if (tag) {
			dispatch(loadPostsByTag(tag));
		}
	}, [dispatch, tag]);

	return (
		<div>
			<h2>#{tag}</h2>
		</div>
	);
};
