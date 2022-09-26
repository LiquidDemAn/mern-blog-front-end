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
} from '@mui/material';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { PathsEnum } from '../../typedef';
import { CommentsSkeleton } from './skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
};

export const Comments = ({ items = [], children, isLoading }: Props) => {
	if (isLoading) {
		return <CommentsSkeleton />;
	}

	return (
		<SideBlock title='Comments'>
			<List>
				{items.map((item, index) => (
					<Fragment key={index}>
						<ListItem style={{ display: 'flex', alignItems: 'flex-start' }}>
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
						</ListItem>
						<Divider variant='inset' component='li' />
					</Fragment>
				))}
			</List>
			{children ? <>{children}</> : <></>}
		</SideBlock>
	);
};
