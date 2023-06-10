import { useState, SyntheticEvent } from 'react';
import { TabsEnum } from 'typedef';
import { useSelf } from 'hooks/useSelf';
import { PostsWithTags } from '../../components/PostsWithTags';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { Typography } from '@mui/material';

const Home = () => {
  const { self } = useSelf();
  const [value, setValue] = useState(TabsEnum.New);

  const handleChange = (event: SyntheticEvent, newValue: TabsEnum) => {
    setValue(newValue);
  };

  useCheckAuth();

  return (
    <>
      <Typography component="h2" className="mb-4">
        Hello{self?.nickName && `, ${self.nickName}`}
      </Typography>
      <PostsWithTags value={value} handleChange={handleChange} />
    </>
  );
};

export default Home;
