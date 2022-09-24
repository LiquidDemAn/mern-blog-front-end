import { ReactElement, Fragment } from 'react';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	List,
	Skeleton,
	SvgIcon,
} from '@mui/material';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { PathsEnum } from '../../typedef';
import { CommentsSkeleton } from './skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
};

export const Comments = ({ items = [], children, isLoading = true }: Props) => {
	if (isLoading) {
		return <CommentsSkeleton />;
	}

	return (
		<SideBlock title='Comments'>
			<List>
				{items.map((item, index) => (
					<Fragment key={index}>
						<ListItem>
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant='circular' width={40} height={40} />
								) : (
									<Avatar
										alt={item.author.nickName}
										src={`${PathsEnum.Server}${item.author.avatarUrl}`}
									/>
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant='text' height={25} width={120} />
									<Skeleton variant='text' height={18} width={230} />
								</div>
							) : (
								<div>
									<ListItemText
										primary={item.author.fullName}
										secondary={item.text}
									/>

									<FavoriteIcon />
								</div>
							)}
						</ListItem>
						<Divider variant='inset' component='li' />
					</Fragment>
				))}
			</List>
			{children ? <>{children}</> : <></>}
		</SideBlock>
	);
};
