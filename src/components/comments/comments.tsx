import { ReactElement, Fragment, useState } from 'react';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { CommentsSkeleton } from './skeleton';
import { useAppSelector } from '../../redux/store/hooks';
import { getUserId } from '../../redux/services/auth/selectors';
import {
	List,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Comment } from '../comment/comment';

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

	const closeDeleteHandle = () => {
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

	const closeEditHandle = () => {
		setComment({
			id: '',
			text: '',
		});
		setOpenEdit(false);
	};

	const handleDelete = () => {
		if (id) {
			closeDeleteHandle();
			deleteComment(id, comment.id);
		}
	};

	const handleEdit = () => {
		if (id && comment.text) {
			closeEditHandle();
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
			<Dialog
				open={openDelete}
				onClose={closeDeleteHandle}
				aria-labelledby='delete-comment-title'
				aria-describedby='delete-comment-description'
			>
				<DialogTitle id='delete-comment-title'>Deleting a Comment!</DialogTitle>
				<DialogContent>
					<DialogContentText id='delete-comment-description'>
						Do you really want to delete this Comment?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={closeDeleteHandle}>
						Cancel
					</Button>
					<Button onClick={handleDelete} variant='contained' color='error'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={openEdit}
				onClose={closeEditHandle}
				aria-labelledby='edit-comment-title'
				aria-describedby='edit-comment-description'
				fullWidth
			>
				<DialogTitle id='edit-comment-title'>Editing a comment!</DialogTitle>
				<DialogContent>
					<DialogContentText id='edit-comment-description'>
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
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={closeEditHandle}>
						Cancel
					</Button>
					<Button onClick={handleEdit} variant='contained' color='success'>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
