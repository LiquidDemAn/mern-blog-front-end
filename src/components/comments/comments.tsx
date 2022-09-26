import styles from './comments.module.scss';
import { ReactElement, Fragment } from 'react';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	List,
	SvgIcon,
	IconButton,
} from '@mui/material';
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

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
};

export const Comments = ({ items = [], children, isLoading }: Props) => {
	const userId = useAppSelector(getUserId);

	if (isLoading) {
		return <CommentsSkeleton />;
	}

	return (
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
									<IconButton color='error'>
										<DeleteIcon />
									</IconButton>
								</div>
							)}
						</ListItem>
						<Divider variant='inset' component='li' />
					</Fragment>
				))}
			</List>
			{children && userId ? <>{children}</> : <></>}
		</SideBlock>
	);
};
