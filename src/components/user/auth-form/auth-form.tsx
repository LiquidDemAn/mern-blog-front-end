import styles from './auth-form.module.scss';
import { FC, PropsWithChildren } from 'react';
import { Typography, Paper, Button } from '@mui/material';

type Props = {
  onSubmit: () => void;
  title: string;
  btnName?: string;
};

export const AuthForm: FC<PropsWithChildren<Props>> = ({
  onSubmit,
  title,
  btnName,
  children
}) => {
  return (
    <Paper className={styles.root}>
      <Typography className={styles.title} variant="h5">
        {title} page
      </Typography>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}

        <Button
          type="submit"
          size="large"
          color="success"
          variant="contained"
          fullWidth
        >
          {btnName ? btnName : 'Submit'}
        </Button>
      </form>
    </Paper>
  );
};
