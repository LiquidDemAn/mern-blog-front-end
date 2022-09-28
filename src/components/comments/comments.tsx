import { ReactElement, useState } from 'react';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { CommentsSkeleton } from './skeleton';
import { useAppSelector } from '../../redux/store/hooks';
import { getUserId } from '../../redux/services/auth/selectors';
import { List, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Comment } from '../comment';
import { EditDialog } from '../dialogs/edit';
import { DeleteDialog } from '../dialogs/delete';

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
	editComment: (
		postId: string,
		commentId: string,
		text: string
	) => Promise<void>;
	deleteComment: (postId: string, commentId: string) => Promise<void>;
};

export const Comments = ({
	items = [],
	children,
	isLoading,
	editComment,
	deleteComment,
}: Props) => {
	const { id } = useParams();
	const userId = useAppSelector(getUserId);

	const [comment, setComment] = useState({
		id: '',
		text: '',
	});

	const [openDelete, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const openDeleteHandle = (id: string) => {
		setComment({
			id,
			text: '',
		});
		setOpenDelete(true);
	};

	const handleCloseDelete = () => {
		setComment({
			id: '',
			text: '',
		});
		setOpenDelete(false);
	};

	const openEditHandle = (id: string, text: string) => {
		setComment({
			id,
			text,
		});
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setComment({
			id: '',
			text: '',
		});
		setOpenEdit(false);
	};

	const handleDelete = () => {
		if (id) {
			handleCloseDelete();
			deleteComment(id, comment.id);
		}
	};

	const handleEdit = () => {
		if (id && comment.text) {
			handleCloseEdit();
			editComment(id, comment.id, comment.text);
		}
	};

	if (isLoading) {
		return <CommentsSkeleton />;
	}

	return (
		<>
			<SideBlock title='Comments'>
				<List>
					{items.map((item) => (
						<Comment
							key={item._id}
							comment={item}
							userId={userId}
							openEditHandle={openEditHandle}
							openDeleteHandle={openDeleteHandle}
						/>
					))}
				</List>
				{children && userId ? <>{children}</> : <></>}
			</SideBlock>

			{/* Dialogs */}
			<EditDialog
				title='Editing a comment!'
				open={openEdit}
				closeHandle={handleCloseEdit}
				onSubmit={handleEdit}
			>
				<TextField
					onChange={(event) =>
						setComment({
							...comment,
							text: event.target.value,
						})
					}
					value={comment.text}
					label='Write a comment'
					variant='standard'
					multiline
					fullWidth
				/>
			</EditDialog>

			<DeleteDialog
				title='Deleting a Comment!'
				open={openDelete}
				handleClose={handleCloseDelete}
				onDelete={handleDelete}
			>
				<> Do you really want to delete this Comment?</>
			</DeleteDialog>
		</>
	);
};
