import { FC, useState } from 'react';
import { Tabs, Tab, Grid } from '@mui/material';
import { TabsEnum } from 'typedef';
import { TabPanel } from '../../common/tab-panel';
import { Posts } from '../posts-wrapper/posts';
import { useAppSelector } from 'redux/store/hooks';

import {
  getPostsLoading,
  getPostsError,
  getPosts
} from 'redux/services/posts/selectors';
import { useApi } from './useApi';
import { Props } from './types';
import Tags from 'components/Tags';
import { getPostsTabs } from 'components/posts/posts-tags-content/utils';

export const PostsTagsContent: FC<Props> = ({ value, handleChange }: Props) => {
  const [isTagsShow, setIsTagsShow] = useState(true);

  const handleHideTags = () => {
    setIsTagsShow(false);
  };

  const posts = useAppSelector(getPosts);
  const postsLoading = useAppSelector(getPostsLoading);
  const postsError = useAppSelector(getPostsError);

  const { getTagsQuery } = useApi();

  const {
    data: tags,
    isLoading: tagsLoading,
    isError: isTagsError
  } = getTagsQuery;

  const tabs = getPostsTabs({
    posts,
    isError: postsError,
    isLoading: postsLoading
  });

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
        <Tab label={TabsEnum.New} value={TabsEnum.New} />
        <Tab label={TabsEnum.Popular} value={TabsEnum.Popular} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={isTagsShow ? 8 : 12} item>
          <TabPanel value={value} index={TabsEnum.New}>
            <Posts isLoading={postsLoading} error={postsError} posts={posts} />
          </TabPanel>
          <TabPanel value={value} index={TabsEnum.Popular}>
            <Posts isLoading={postsLoading} error={postsError} posts={posts} />
          </TabPanel>
        </Grid>

        {isTagsShow && (
          <Grid className="hidden md:block" xs={4} item>
            <Tags
              handleHideTags={handleHideTags}
              tags={tags}
              isLoading={tagsLoading}
              isError={isTagsError}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
