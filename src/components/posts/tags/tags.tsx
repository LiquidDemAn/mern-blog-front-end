import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { SideBlock } from '../../common/side-block';
import { Link } from 'react-router-dom';
import { ErrorType } from '../../../typedef';
import { isError } from 'react-query';

type Props = {
  tags?: string[];
  isLoading: boolean;
  isError?: boolean;
};

export const Tags = ({ tags = [], isLoading, isError }: Props) => {
  return (
    <SideBlock title="Tags">
      <List>
        <>
          {!isError ? (
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
            <ListItem>Something went wrong...</ListItem>
          )}
        </>
      </List>
    </SideBlock>
  );
};
