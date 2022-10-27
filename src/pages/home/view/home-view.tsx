import { SyntheticEvent } from 'react';
import { ErrorDialog } from '../../../components/dialogs/error';
import { PostsTagsContent } from '../../../components/posts/posts-tags-content';
import { ErrorType, TabsEnum } from '../../../typedef';

type Props = {
	open: boolean;
	userName?: string;
	value: TabsEnum;
	deleteError: ErrorType | null;
	handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
	handleClose: () => void;
};

export const HomeView = ({
	open,
	userName,
	value,
	deleteError,
	handleChange,
	handleClose,
}: Props) => {
	return (
		<>
			<h2 style={{ marginBottom: 15 }}>Hello{userName && `, ${userName}`}</h2>
			<PostsTagsContent value={value} handleChange={handleChange} />
            
			{/* Dialogs */}
			<ErrorDialog
				open={open}
				handleClose={handleClose}
				title='Deletion Error!'
			>
				<>
					{deleteError?.status === 500 && (
						<>Something went wrong!!!!! Try again later...</>
					)}

					{deleteError?.status === 404 && <>Post not found!</>}
				</>
			</ErrorDialog>
		</>
	);
};
