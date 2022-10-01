import styles from './comment.module.scss';
import { PostCommentType } from '../../redux/services/posts/typedef';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	SvgIcon,
	IconButton,
} from '@mui/material';
import { PathsEnum } from '../../typedef';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
	userId: string;
	comment: PostCommentType;
	handleEditOpen: (id: string, text: string) => void;
	handleDeleteOpen: (id: string) => void;
};

export const Comment = ({
	comment,
	userId,
	handleEditOpen,
	handleDeleteOpen,
}: Props) => {
	const onEdit = () => {
		handleEditOpen(comment._id, comment.text);
	};

	const onDelete = () => {
		handleDeleteOpen(comment._id);
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
					<ListItemAvatar>
						<Avatar
							alt={comment.author.nickName}
							src={`${PathsEnum.Server}${comment.author.avatarUrl}`}
						/>
					</ListItemAvatar>

					<div>
						<ListItemText
							style={{ marginTop: '0', whiteSpace: 'pre-line' }}
							primary={comment.author.fullName}
							secondary={comment.text}
						/>
						<div className={styles.likes}>
							<SvgIcon fontSize='small'>
								<FavoriteBorderIcon />
							</SvgIcon>
							<span>{comment.likesCount}</span>
						</div>
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
