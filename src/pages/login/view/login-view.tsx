import { Alert, TextField } from '@mui/material';
import { AuthForm } from '../../../components/auth-form';
import {
	DeepRequired,
	FieldErrorsImpl,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { AuthErrorType, LoginType } from '../../../redux/services/auth/typedef';

type Props = {
	isValid: boolean;
	errors: FieldErrorsImpl<DeepRequired<LoginType>>;
	error: AuthErrorType | null;
	handleSubmit: UseFormHandleSubmit<LoginType>;
	register: UseFormRegister<LoginType>;
	onSubmit: (values: LoginType) => void;
};

export const LoginView = ({
	isValid,
	errors,
	error,
	handleSubmit,
	register,
	onSubmit,
}: Props) => {
	return (
		<AuthForm
			isValid={isValid}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title='Login'
		>
			{error?.status === 500 ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Something went wrong! Failed to login!
				</Alert>
			) : (
				<></>
			)}

			{error?.status === 400 ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Login or password do not match
				</Alert>
			) : (
				<></>
			)}

			<TextField
				fullWidth
				label='Email'
				error={Boolean(errors.password?.message)}
				helperText={errors.email?.message}
				type='email'
				id='email'
				{...register('email', { required: 'Enter email' })}
			/>

			<TextField
				fullWidth
				label='Password'
				error={Boolean(errors.password?.message)}
				helperText={errors.password?.message}
				type='password'
				id='password'
				{...register('password', { required: 'Enter password' })}
			/>
		</AuthForm>
	);
};