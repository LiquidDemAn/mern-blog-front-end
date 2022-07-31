import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { SideBlock } from '../side-block';

type Props = {
	items: string[];
	isLoading?: boolean;
};

export const Tags = ({ items, isLoading = true }: Props) => {
	return (
		<SideBlock title='Тэги'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<a
						style={{ textDecoration: 'none', color: 'black' }}
						href={`/tags/${name}`}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</a>
				))}
			</List>
		</SideBlock>
	);
};
