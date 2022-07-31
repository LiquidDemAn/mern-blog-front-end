import styles from './side-block.module.scss';
import { ReactElement } from 'react';
import { Typography, Paper } from '@mui/material';

type Props = {
	title: string;
	children: ReactElement | ReactElement[];
};

export const SideBlock = ({ title, children }: Props) => {
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography variant='h6' classes={{ root: styles.title }}>
				{title}
			</Typography>
			{children}
		</Paper>
	);
};
