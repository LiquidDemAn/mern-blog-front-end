import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useRef } from 'react';

import styles from './auth.module.scss';
import {
	FormControl,
	Input,
	InputLabel,
	FormHelperText,
	Avatar,
} from '@mui/material';

export enum AuthEnum {
	Registration = 'Registration',
	Login = 'Login',
}

type Props = {
	authType: AuthEnum;
	// onSubmit: (
	// 	event: React.FormEvent<HTMLButtonElement>,
	// 	email: string,
	// 	password: string,
	// 	fullName?: string
	// ) => void;
};

export const Auth = ({ authType }: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const nameRef = useRef<HTMLInputElement | null>(null);

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				{authType === AuthEnum.Registration && AuthEnum.Registration}
				{authType === AuthEnum.Login && AuthEnum.Login} page
			</Typography>

			{authType === AuthEnum.Registration && (
				<div className={styles.avatar}>
					<Avatar sx={{ width: 100, height: 100 }} />
				</div>
			)}

			<form className={styles.form}>
				{authType === AuthEnum.Registration && (
					<FormControl className={styles.field} fullWidth>
						<InputLabel htmlFor='input-name'>Full Name</InputLabel>
						<Input
							ref={nameRef}
							type='text'
							id='input-name'
							aria-describedby='input-name-helper'
						/>
					</FormControl>
				)}

				<FormControl className={styles.field} fullWidth>
					<InputLabel htmlFor='input-email'>Email Address</InputLabel>
					<Input
						ref={emailRef}
						type='email'
						id='input-email'
						aria-describedby='input-email-helper'
					/>
					{/* <FormHelperText error id='input-email-helper'>
					We'll never share your email.
				</FormHelperText> */}
				</FormControl>

				<FormControl className={styles.field} fullWidth>
					<InputLabel htmlFor='input-password'>Password</InputLabel>
					<Input
						ref={passwordRef}
						type='password'
						id='input-password'
						aria-describedby='input-password-helper'
					/>
					{/* <FormHelperText error id='input-email-helper'>
					We'll never share your email.
				</FormHelperText> */}
				</FormControl>

				<Button type='submit' size='large' variant='contained' fullWidth>
					{authType === AuthEnum.Registration && AuthEnum.Registration}
					{authType === AuthEnum.Login && AuthEnum.Login}
				</Button>
			</form>
		</Paper>
	);
};
