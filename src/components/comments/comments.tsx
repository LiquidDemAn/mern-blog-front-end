import React, { ReactElement } from 'react';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	List,
	Skeleton,
} from '@mui/material';
import { SideBlock } from '../side-block';
import { PostCommentType } from '../../redux/services/posts/typedef';
import { PathsEnum } from '../../typedef';

type Props = {
	items?: PostCommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
};

export const Comments = ({ items = [], children, isLoading = true }: Props) => {
	return (
		<SideBlock title='Comments'>
			<List>
				{items.map((item, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems='flex-start'>
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
								<ListItemText
									primary={item.author.fullName}
									secondary={item.text}
								/>
							)}
						</ListItem>
						<Divider variant='inset' component='li' />
					</React.Fragment>
				))}
			</List>
			{children ? <>{children}</> : <></>}
		</SideBlock>
	);
};
