import { Fragment } from 'react';
import {
	ListItem,
	ListItemAvatar,
	Divider,
	List,
	Skeleton,
} from '@mui/material';
import { SideBlock } from '../side-block';

export const CommentsSkeleton = () => {
	const arr = [...Array(2)];

	return (
		<SideBlock title='Comments'>
			<List>
				{arr.map((_, index) => (
					<Fragment key={index}>
						<ListItem>
							<ListItemAvatar>
								<Skeleton variant='circular' width={40} height={40} />
							</ListItemAvatar>

							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Skeleton variant='text' height={25} width={120} />
								<Skeleton variant='text' height={18} width={230} />
								<Skeleton variant='text' height={20} width={20} />
							</div>
						</ListItem>
						<Divider variant='inset' component='li' />
					</Fragment>
				))}
			</List>
		</SideBlock>
	);
};
