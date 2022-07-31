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
import { CommentType } from '../../typedef';

type Props = {
	items: CommentType[];
	isLoading?: boolean;
	children?: ReactElement | ReactElement[];
};

export const Comments = ({ items, children, isLoading = true }: Props) => {
	return (
		<SideBlock title='Комментарии'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((obj, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems='flex-start'>
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant='circular' width={40} height={40} />
								) : (
									<Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Skeleton variant='text' height={25} width={120} />
									<Skeleton variant='text' height={18} width={230} />
								</div>
							) : (
								<ListItemText
									primary={obj.user.fullName}
									secondary={obj.text}
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
