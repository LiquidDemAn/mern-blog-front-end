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
} from '@mui/material';
import { useParams } from 'react-router-dom';

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
	deleteComment: (postId: string, commentId: string) => Promise<void>;
};

export const Comments = ({
	items = [],
	children,
	isLoading,
	deleteComment,
}: Props) => {
	const { id } = useParams();

	const userId = useAppSelector(getUserId);
	const [openDelete, setOpenDelete] = useState(false);
	const [commentId, setCommentId] = useState('');

	const openDeleteHandle = (id: string) => {
		setCommentId(id);
		setOpenDelete(true);
	};

	const closeDeleteHandle = () => {
		setCommentId('');
		setOpenDelete(false);
	};

	const handleDelete = (postId: string, commentId: string) => {
		deleteComment(postId, commentId).then(() => {
			closeDeleteHandle();
		});
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
										<IconButton color='primary'>
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
					<Button
						onClick={() => id && handleDelete(id, commentId)}
						variant='contained'
						color='error'
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
