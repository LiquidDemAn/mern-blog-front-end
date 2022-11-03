import { Alert, TextField } from '@mui/material';
import { AuthForm } from '../../../components/user/auth-form';
import {
	DeepRequired,
	FieldErrorsImpl,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { UserErrorType, LoginType } from '../../../redux/services/user/typedef';

type Props = {
	isValid: boolean;
	errors: FieldErrorsImpl<DeepRequired<LoginType>>;
	error: UserErrorType | null;
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
			{error && error.status === 500 ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Something went wrong! Failed to login!
				</Alert>
			) : (
				<></>
			)}

			{error && error.status !== 500 ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Login or password do not match
				</Alert>
			) : (
				<></>
			)}

			<TextField
				fullWidth
				label='Email'
				error={Boolean(errors.email?.message)}
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
