import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadPosts } from '../../redux/services/posts/actions';
import { useAppDispach } from '../../redux/store/hooks';
import { PathsEnum, TabsEnum } from '../../typedef';
import { PostsWithTags } from '../../components/PostsWithTags';
import { getToken } from '../../local-storage';

export const Tag = () => {
  const { tag } = useParams();
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const isToken = Boolean(getToken());
  const [value, setValue] = useState(TabsEnum.New);

  const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (tag) {
      if (value === TabsEnum.New) {
        dispatch(loadPosts(`posts/tags/${tag}`));
      }
      if (value === TabsEnum.Popular) {
        dispatch(loadPosts(`posts/tags/${tag}/popular`));
      }
    }
  }, [dispatch, value, tag]);

  useEffect(() => {
    if (!isToken) {
      navigate(PathsEnum.Login);
    }
  }, [isToken, navigate]);

  // useEffect(() => {
  //   dispatch(loadTags());
  // }, [dispatch]);

  return (
    <>
      {isToken ? (
        <>
          <h2>Tag: #{tag}</h2>
          <PostsWithTags value={value} handleChange={handleChange} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
