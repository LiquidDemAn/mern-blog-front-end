import { Alert, TextField } from '@mui/material';
import { loginUser } from '../../redux/services/auth/actions';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { loginType, ParamsEnum } from '../../redux/services/auth/typedef';
import { AuthForm } from '../../components/auth-form';
import {
	getAuthError,
	getAuthValidationError,
	getIsAuth,
} from '../../redux/services/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const error = useAppSelector(getAuthError);
	const validationError = useAppSelector(getAuthValidationError);

	const passwordError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.Password;
		})
	);
	const emailError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.Email;
		})
	);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: 'dexter@gmail.com',
			password: '123',
		},
		mode: 'onChange',
	});

	const onSubmit = (values: loginType) => {
		dispatch(loginUser(values));
	};

	useEffect(() => {
		if (passwordError) {
			setError('password', {
				type: 'password',
				message: 'Password must be at least 5 characters long',
			});
		}
	}, [setError, passwordError]);

	useEffect(() => {
		if (emailError) {
			setError('email', {
				type: 'email',
				message: 'Eamil is invalid',
			});
		}
	}, [setError, emailError]);

	if (isAuth) {
		return <Navigate to='/' />;
	}

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
				error={Boolean(error) || emailError}
				helperText={errors.email?.message}
				type='email'
				id='email'
				{...register('email', { required: 'Enter email' })}
			/>

			<TextField
				fullWidth
				label='Password'
				error={Boolean(error) || passwordError}
				helperText={errors.password?.message}
				type='password'
				id='password'
				{...register('password', { required: 'Enter password' })}
			/>
		</AuthForm>
	);
};
