import { Alert, TextField } from '@mui/material';
import { AuthForm } from '../../../components/auth-form';

import {
	AuthErrorType,
	ParamsEnum,
	RegisterType,
} from '../../../redux/services/auth/typedef';
import {
	DeepRequired,
	FieldErrorsImpl,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { AvatarCreator } from '../../../components/avatar-creator';

type Props = {
	isValid: boolean;
	errors: FieldErrorsImpl<DeepRequired<RegisterType>>;
	error: AuthErrorType | null;
	handleSubmit: UseFormHandleSubmit<RegisterType>;
	register: UseFormRegister<RegisterType>;
	setAvatar: (valuse: string) => void;
	onSubmit: (values: RegisterType) => void;
};

export const RegistrationView = ({
	isValid,
	errors,
	error,
	handleSubmit,
	register,
	setAvatar,
	onSubmit,
}: Props) => {
	return (
		<AuthForm
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			title='Registration'
			isValid={isValid}
		>
			{error?.status === 420 && error?.data.param === ParamsEnum.Email ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Email already in use!
				</Alert>
			) : (
				<></>
			)}

			{error?.status === 420 && error?.data.param === ParamsEnum.NickName ? (
				<Alert severity='error' style={{ width: '100%' }}>
					Nick name already in use!
				</Alert>
			) : (
				<></>
			)}

			<AvatarCreator setAvatar={setAvatar} />

			<TextField
				fullWidth
				label='Full Name'
				error={Boolean(errors.fullName?.message)}
				helperText={
					errors.fullName?.message ||
					'Full name must be at least 3 characters long and not contain special characters!'
				}
				id='full-name'
				{...register('fullName', { required: 'Enter full name' })}
			/>

			<TextField
				fullWidth
				label='Nick Name'
				error={Boolean(errors.nickName?.message)}
				helperText={
					errors.nickName?.message ||
					'Nick name must be at least 3 characters long, not contain spaces and special characters!'
				}
				id='nick-name'
				{...register('nickName', { required: 'Enter nickname' })}
			/>

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
				helperText={
					errors.password?.message ||
					'Password must be at least 5 characters long!'
				}
				type='password'
				id='password'
				{...register('password', { required: 'Enter password' })}
			/>
		</AuthForm>
	);
};
