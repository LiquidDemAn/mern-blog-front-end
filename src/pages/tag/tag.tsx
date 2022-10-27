import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadPosts } from '../../redux/services/posts/actions';
import { loadTags } from '../../redux/services/tags/actions';
import { useAppDispach } from '../../redux/store/hooks';
import { PathsEnum, TabsEnum } from '../../typedef';
import { PostsTagsContent } from '../../components/posts/posts-tags-content';
import { getToken } from '../../local-storage';

export const Tag = () => {
	const { tag } = useParams();
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const isToken = Boolean(getToken());
	const [value, setValue] = useState(TabsEnum.New);

	useEffect(() => {
		if (tag) {
			if (value === TabsEnum.New) {
				dispatch(loadPosts(`/posts/tags/${tag}`));
			}
			if (value === TabsEnum.Popular) {
				dispatch(loadPosts(`/posts/tags/${tag}/popular`));
			}
		}
	}, [dispatch, value, tag]);

	useEffect(() => {
		if (!isToken) {
			navigate(PathsEnum.Login);
		}
	}, [isToken, navigate]);

	useEffect(() => {
		dispatch(loadTags());
	}, [dispatch]);

	console.log(isToken);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};

	return (
		<>
			{isToken ? (
				<>
					<h2>Tag: #{tag}</h2>
					<PostsTagsContent value={value} handleChange={handleChange} />
				</>
			) : (
				<></>
			)}
		</>
	);
};
