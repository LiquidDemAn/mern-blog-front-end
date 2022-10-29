import { SyntheticEvent } from 'react';
import { PostsTagsContent } from '../../../components/posts/posts-tags-content';
import { TabsEnum } from '../../../typedef';

type Props = {
	userName?: string;
	value: TabsEnum;
	handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
};

export const HomeView = ({ userName, value, handleChange }: Props) => {
	return (
		<>
			<h2 style={{ marginBottom: 15 }}>Hello{userName && `, ${userName}`}</h2>
			<PostsTagsContent value={value} handleChange={handleChange} />
		</>
	);
};
