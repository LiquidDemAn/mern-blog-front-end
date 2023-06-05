import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { PaperWrapper } from 'components/PaperWrapper';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Props } from 'components/Tags/types';

const Tags: FC<Props> = ({ tags = [], isLoading }: Props) => {
  return (
    <PaperWrapper title="Tags">
      <List>
        {tags.length ? (
          (isLoading ? [...Array(5)] : tags).map((tag, index) => (
            <Link
              key={tag || index}
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/tags/${tag}`}
            >
              <ListItem disablePadding>
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
    </PaperWrapper>
  );
};

export default Tags;
