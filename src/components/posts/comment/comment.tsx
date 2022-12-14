import styles from './comment.module.scss';
import { PostCommentType } from '../../../redux/services/posts/typedef';
import {
	ListItem,
	ListItemText,
	Divider,
	SvgIcon,
	IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../redux/store/hooks';
import { getUserId } from '../../../redux/services/user/selectors';
import { UserInfo } from '../../user/user-info';

type Props = {
	comment: PostCommentType;
	handleEditOpen: (id: string, text: string) => void;
	handleDeleteOpen: (id: string) => void;
	onlikeComment: (commentId: string) => Promise<void>;
	onUnLikeComment: (commentId: string) => Promise<void>;
};

export const Comment = ({
	comment,
	handleEditOpen,
	handleDeleteOpen,
	onlikeComment,
	onUnLikeComment,
}: Props) => {
	const userId = useAppSelector(getUserId);
	const isLiked = comment.likesIds.includes(userId);

	const onEdit = () => {
		handleEditOpen(comment._id, comment.text);
	};

	const onDelete = () => {
		handleDeleteOpen(comment._id);
	};

	const onLike = () => {
		onlikeComment(comment._id);
	};

	const onUnlike = () => {
		onUnLikeComment(comment._id);
	};

	return (
		<>
			<ListItem
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
				}}
			>
				<div className={styles.comment}>
					<UserInfo
						avatarUrl={comment.author.avatarUrl}
						fullName={comment.author.fullName}
						nickName={comment.author.nickName}
					/>

					<ListItemText className={styles.text} primary={comment.text} />

					<div onClick={isLiked ? onUnlike : onLike} className={styles.likes}>
						{isLiked ? (
							<SvgIcon fontSize='small' htmlColor='red'>
								<FavoriteIcon />
							</SvgIcon>
						) : (
							<SvgIcon fontSize='small'>
								<FavoriteBorderIcon />
							</SvgIcon>
						)}

						<span>{comment.likesCount}</span>
					</div>
				</div>

				{comment.author._id === userId && (
					<div className={styles.settings}>
						<IconButton onClick={onEdit} color='primary'>
							<EditIcon />
						</IconButton>
						<IconButton onClick={onDelete} color='error'>
							<DeleteIcon />
						</IconButton>
					</div>
				)}
			</ListItem>
			<Divider variant='inset' component='li' />
		</>
	);
};
