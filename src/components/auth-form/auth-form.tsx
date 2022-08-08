import styles from './auth-form.module.scss';
import { ReactElement } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import { UseFormHandleSubmit } from 'react-hook-form';

type Props<T> = {
	handleSubmit: UseFormHandleSubmit<T>;
	isValid: boolean;
	onSubmit: (values: T) => void;
	title: string;
	btnName?: string;
	children: ReactElement | ReactElement[];
};

export const AuthForm = <T extends object>({
	handleSubmit,
	isValid,
	onSubmit,
	title,
	btnName,
	children,
}: Props<T>) => {
	return (
		<Paper className={styles.root}>
			<Typography className={styles.title} variant='h5'>
				{title} page
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{children}

				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					{btnName ? btnName : 'Submit'}
				</Button>
			</form>
		</Paper>
	);
};
