import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadPosts } from '../../redux/services/posts/actions';
import { loadTags } from '../../redux/services/tags/actions';
import { useAppDispach } from '../../redux/store/hooks';
import { TabsEnum } from '../../typedef';
import { PostsTagsContent } from '../../components/posts-tags-content';

export const Tag = () => {
	const { tag } = useParams();
	const dispatch = useAppDispach();

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
		dispatch(loadTags());
	}, [dispatch]);

	const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
		setValue(newValue);
	};
	return (
		<div>
			<h2>Tag: #{tag}</h2>
			<PostsTagsContent value={value} handleChange={handleChange} />
		</div>
	);
};
