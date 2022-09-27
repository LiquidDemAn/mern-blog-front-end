import styles from './comments.module.scss';
import { ReactElement, Fragment, useState } from 'react';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { PathsEnum } from '../../typedef';
import { CommentsSkeleton } from './skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../redux/store/hooks';
import { getUserId } from '../../redux/services/auth/selectors';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	List,
	SvgIcon,
	IconButton,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';

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
					{items.map((item, index) => (
						<Fragment key={index}>
							<ListItem
								style={{
									display: 'flex',
									alignItems: 'flex-start',
									justifyContent: 'space-between',
								}}
							>
								<div className={styles.comment}>
									<ListItemAvatar>
										<Avatar
											alt={item.author.nickName}
											src={`${PathsEnum.Server}${item.author.avatarUrl}`}
										/>
									</ListItemAvatar>

									<div>
										<ListItemText
											style={{ marginTop: '0' }}
											primary={item.author.fullName}
											secondary={item.text}
										/>
										<div className={styles.likes}>
											<SvgIcon fontSize='small'>
												<FavoriteBorderIcon />
											</SvgIcon>
											<span>{item.likesCount}</span>
										</div>
									</div>
								</div>

								{item.author._id === userId && (
									<div className={styles.settings}>
										<IconButton
											onClick={() => openEditHandle(item._id, item.text)}
											color='primary'
										>
											<EditIcon />
										</IconButton>
										<IconButton
											onClick={() => openDeleteHandle(item._id)}
											color='error'
										>
											<DeleteIcon />
										</IconButton>
									</div>
								)}
							</ListItem>
							<Divider variant='inset' component='li' />

							{/* Dialogs */}
						</Fragment>
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
