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
	openEditHandle: (id: string, text: string) => void;
	openDeleteHandle: (id: string) => void;
};

export const Comment = ({
	comment,
	userId,
	openEditHandle,
	openDeleteHandle,
}: Props) => {
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
							style={{ marginTop: '0' }}
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
						<IconButton
							onClick={() => openEditHandle(comment._id, comment.text)}
							color='primary'
						>
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={() => openDeleteHandle(comment._id)}
							color='error'
						>
							<DeleteIcon />
						</IconButton>
					</div>
				)}
			</ListItem>
			<Divider variant='inset' component='li' />
		</>
	);
};
