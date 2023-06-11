import styles from './add-comment.module.scss';
import { useState } from 'react';
import { TextField, Avatar, Button } from '@mui/material';
import { useAppSelector } from '../../../../redux/store/hooks';
import { PathsEnum } from '../../../../typedef';
import { useSelf } from 'hooks/useSelf';

type Props = {
  createComment: (text: string) => void;
};

export const AddComment = ({ createComment }: Props) => {
  const { self } = useSelf();
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value) {
      createComment(value);
      setValue('');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={
            (process.env.REACT_APP_API_URL || PathsEnum.Server) +
            self?.avatarUrl
          }
        />
        <div className={styles.form}>
          <TextField
            onChange={(event) => setValue(event.target.value)}
            value={value}
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            fullWidth
          />
          <Button onClick={handleSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
