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
	tags: string[];
	isLoading?: boolean;
};

export const Tags = ({ tags, isLoading = true }: Props) => {
	return (
		<SideBlock title='Tags'>
			<List>
				{tags.length ? (
					(isLoading ? [...Array(5)] : tags).map((tag) => (
						<a
							key={tag}
							style={{ textDecoration: 'none', color: 'black' }}
							href={`/tags/${tag}`}
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
						</a>
					))
				) : (
					<ListItem>List is empty</ListItem>
				)}
			</List>
		</SideBlock>
	);
};
