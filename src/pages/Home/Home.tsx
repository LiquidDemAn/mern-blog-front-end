import { useState, SyntheticEvent } from 'react';
import { TabsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { PostsWithTags } from '../../components/PostsWithTags';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { Typography } from '@mui/material';
import { useApi } from './useApi';
import { getPostsTabs } from './utils';

const Home = () => {
  const { self } = useSelf();
  const [currentTab, setCurrentTab] = useState(TabsEnum.New);

  const handleChangeTab = (event: SyntheticEvent, newTab: TabsEnum) => {
    setCurrentTab(newTab);
  };

  const {
    tags,
    allPosts,
    popularPosts,
    isAllPostsError,
    isPopularPostsError,
    isPostsLoading,
    isTagsLoading
  } = useApi({
    postsType: currentTab
  });

  const tabs = getPostsTabs({
    popularPosts,
    allPosts,
    isAllPostsError,
    isPopularPostsError,
    isPostsLoading
  });

  useCheckAuth();

  if (!self) {
    return <></>;
  }

  return (
    <>
      <Typography variant="h6" className="mb-4">
        Hello {self.nickName}
      </Typography>
      <PostsWithTags
        tags={tags}
        tabs={tabs}
        currentTab={currentTab}
        handleChangeTab={handleChangeTab}
        isTagsLoading={isTagsLoading}
      />
    </>
  );
};

export default Home;