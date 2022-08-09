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
import { Link } from 'react-router-dom';

type Props = {
	tags: string[];
	isLoading?: boolean;
};

export const Tags = ({ tags, isLoading }: Props) => {
	return (
		<SideBlock title='Tags'>
			<List>
				{tags.length ? (
					(isLoading ? [...Array(5)] : tags).map((tag) => (
						<Link
							key={tag}
							style={{ textDecoration: 'none', color: 'black' }}
							to={`/tags/${tag}`}
						>
							<ListItem key={tag} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<TagIcon />
									</ListItemIcon>
									{isLoading ? (
										<Skeleton width={100} />
									) : (
										<ListItemText primary={tag} />
									)}
								</ListItemButton>
							</ListItem>
						</Link>
					))
				) : (
					<ListItem>List is empty</ListItem>
				)}
			</List>
		</SideBlock>
	);
};
