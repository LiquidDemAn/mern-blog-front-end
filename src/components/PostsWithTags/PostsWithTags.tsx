import { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { Props } from './types';
import Tags from 'components/Tags';
import TabBar from '../TabBar';

export const PostsWithTags: FC<Props> = ({
  tabs,
  currentTab,
  handleChangeTab,
  tags,
  showTags = true,
  isTagsLoading
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
        <Grid item mt={6} xs={4} className="hidden md:block">
          <Tags
            handleHideTags={handleHideTags}
            tags={tags}
            isLoading={isTagsLoading}
          />
        </Grid>
      )}
    </Grid>
  );
};
