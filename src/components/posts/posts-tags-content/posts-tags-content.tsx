import { FC, useState } from 'react';
import { Grid } from '@mui/material';
import { useApi } from './useApi';
import { Props } from './types';
import Tags from 'components/Tags';
import { getPostsTabs } from 'components/posts/posts-tags-content/utils';
import { Loader } from 'components/common/loader';
import TabBar from '../../TabBar';

export const PostsTagsContent: FC<Props> = ({ value, handleChange }: Props) => {
  const [isTagsShow, setIsTagsShow] = useState(true);

  const handleHideTags = () => {
    setIsTagsShow(false);
  };

  const {
    tags,
    allPosts,
    popularPosts,
    isTagsError,
    isAllPostsError,
    isPopularPostsError,
    isLoading
  } = useApi({
    postsType: value
  });

  const tabs = getPostsTabs({
    popularPosts,
    allPosts,
    isAllPostsError,
    isPopularPostsError,
    isLoading
  });

  if (isLoading) {
    return <Loader open={isLoading} />;
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} md={isTagsShow ? 8 : 12} item>
          <TabBar currentTab={value} tabs={tabs} handleChange={handleChange} />
        </Grid>

        {isTagsShow && (
          <Grid className="hidden md:block mt-16" xs={4} item>
            <Tags
              handleHideTags={handleHideTags}
              tags={tags}
              isLoading={isLoading}
              isError={isTagsError}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
