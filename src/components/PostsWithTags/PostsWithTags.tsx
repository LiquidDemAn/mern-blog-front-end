import { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { Props } from './types';
import Tags from 'components/Tags';
import TabBar from '../TabBar';

export const PostsWithTags: FC<Props> = ({
  currentTab,
  handleChangeTab,
  showTags = true,
  tags,
  tabs
}: Props) => {
  const [isTagsShow, setIsTagsShow] = useState(showTags);

  const handleHideTags = () => {
    setIsTagsShow(false);
  };

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={isTagsShow ? 8 : 12} item>
        <TabBar
          currentTab={currentTab}
          tabs={tabs}
          handleChange={handleChangeTab}
        />
      </Grid>

      {isTagsShow && (
        <Grid className="hidden md:block mt-16" xs={4} item>
          <Tags handleHideTags={handleHideTags} tags={tags} />
        </Grid>
      )}
    </Grid>
  );
};
