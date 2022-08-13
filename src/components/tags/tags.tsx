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
import { ErrorType } from '../../typedef';

type Props = {
	tags: string[];
	isLoading?: boolean;
	error?: ErrorType | null;
};

export const Tags = ({ tags, isLoading, error }: Props) => {
	return (
		<SideBlock title='Tags'>
			<List>
				{error ? (
					<ListItem>Something went wrong...</ListItem>
				) : (
					<>
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
					</>
				)}
			</List>
		</SideBlock>
	);
};
