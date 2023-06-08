import { FC, useState } from 'react';
import { Tabs, Tab, Grid } from '@mui/material';
import { TabsEnum } from 'typedef';
import { TabPanel } from '../../common/tab-panel';
import { Posts } from '../posts-wrapper/posts';

import { useApi } from './useApi';
import { Props } from './types';
import Tags from 'components/Tags';
import { getPostsTabs } from 'components/posts/posts-tags-content/utils';
import { Loader } from 'components/common/loader';

export const PostsTagsContent: FC<Props> = ({ value, handleChange }: Props) => {
  const [isTagsShow, setIsTagsShow] = useState(true);

  const handleHideTags = () => {
    setIsTagsShow(false);
  };

  const { getTagsQuery, getAllPostsQuery, getPopularPostsQuery } = useApi({
    postsType: value
  });

  const {
    data: allPosts,
    isLoading: isAllPostsLoading,
    isError: allPostsError
  } = getAllPostsQuery;
  const {
    data: popularPosts,
    isLoading: isPopularPostsLoading,
    isError: popularPostsError
  } = getPopularPostsQuery;

  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError
  } = getTagsQuery;

  const tabs = getPostsTabs({
    popularPosts,
    allPosts,
    isError: allPostsError || popularPostsError,
    isLoading: isPopularPostsLoading || isAllPostsLoading
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} md={isTagsShow ? 8 : 12} item>
          <Tabs
            style={{ marginBottom: 15 }}
            value={value}
            onChange={handleChange}
          >
            <Tab label={TabsEnum.New} value={TabsEnum.New} />
            <Tab label={TabsEnum.Popular} value={TabsEnum.Popular} />
          </Tabs>

          <TabPanel value={value} index={TabsEnum.New}>
            <Posts
              isLoading={isAllPostsLoading}
              error={allPostsError}
              posts={allPosts}
            />
          </TabPanel>
          <TabPanel value={value} index={TabsEnum.Popular}>
            <Posts
              isLoading={isPopularPostsLoading}
              error={popularPostsError}
              posts={popularPosts}
            />
          </TabPanel>
        </Grid>

        {isTagsShow && (
          <Grid className="hidden md:block mt-16" xs={4} item>
            <Tags
              handleHideTags={handleHideTags}
              tags={tags}
              isLoading={!isTagsLoading}
              isError={isTagsError}
            />
          </Grid>
        )}
      </Grid>
      <Loader
        open={isAllPostsLoading || isPopularPostsLoading || isTagsLoading}
      />
    </>
  );
};
