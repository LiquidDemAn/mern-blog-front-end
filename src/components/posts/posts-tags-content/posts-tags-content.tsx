import { FC, SyntheticEvent } from 'react';
import { Tabs, Tab, Grid } from '@mui/material';
import { BreakpointsEnum, TabsEnum } from '../../../typedef';
import { TabPanel } from '../../common/tab-panel';
import { Posts } from '../posts-wrapper/posts';
import { useAppSelector } from '../../../redux/store/hooks';
import { Tags } from '../tags';

import {
  getTags,
  getTagsLoading,
  getTagsError
} from '../../../redux/services/tags/selectors';

import {
  getPostsLoading,
  getPostsError,
  getPosts
} from '../../../redux/services/posts/selectors';
import { useApi } from './useApi';
import { Props } from './types';

export const PostsTagsContent: FC<Props> = ({ value, handleChange }: Props) => {
  const posts = useAppSelector(getPosts);
  const postsLoading = useAppSelector(getPostsLoading);
  const postsError = useAppSelector(getPostsError);

  const { getTagsQuery } = useApi();

  const {
    data: tags,
    isLoading: tagsLoading,
    isError: isTagsError
  } = getTagsQuery;

  const isMedium = window.innerWidth >= BreakpointsEnum.Medium;

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
        <Tab
          aria-controls={`tabpanel-${TabsEnum.New}`}
          label={TabsEnum.New}
          value={TabsEnum.New}
        />
        <Tab
          aria-controls={`tabpanel-${TabsEnum.Popular}`}
          label={TabsEnum.Popular}
          value={TabsEnum.Popular}
        />
      </Tabs>
      <Grid container={isMedium} spacing={4}>
        <Grid xs={8} item>
          <TabPanel value={value} index={TabsEnum.New}>
            <Posts isLoading={postsLoading} error={postsError} posts={posts} />
          </TabPanel>
          <TabPanel value={value} index={TabsEnum.Popular}>
            <Posts isLoading={postsLoading} error={postsError} posts={posts} />
          </TabPanel>
        </Grid>

        {isMedium && (
          <Grid xs={4} item>
            <Tags isError={isTagsError} tags={tags} isLoading={tagsLoading} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
