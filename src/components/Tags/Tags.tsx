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

const Tags: FC<Props> = ({ tags = [], isLoading, isError, handleHideTags }) => {
  return (
    <PaperWrapper title="Tags" isCloseShow handleClose={handleHideTags}>
      {!isError && (
        <List>
          {(isLoading ? [...Array(5)] : tags).map((tag, index) => (
            <Link
              key={tag || index}
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/tags/${tag}`}
            >
              <ListItem disablePadding>
                <ListItemButton className="!px-0 !py-1">
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <ListItemText
                      primaryTypographyProps={{ noWrap: true }}
                      className="overflow-ellipsis"
                      primary={tag}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </PaperWrapper>
  );
};

export default Tags;
