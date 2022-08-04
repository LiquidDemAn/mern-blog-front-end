import styles from './auth-wrapper.module.scss';
import { ReactElement } from 'react';
import { Typography, Paper } from '@mui/material';

type Props = {
	title: string;
	children: ReactElement | ReactElement[];
};

export const AuthWrapper = ({ title, children }: Props) => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				{title} page
			</Typography>
			{children}
		</Paper>
	);
};
