import { Alert, TextField } from '@mui/material';
import { loginUser } from '../../redux/services/auth/actions';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { LoginType, ParamsEnum } from '../../redux/services/auth/typedef';
import { AuthForm } from '../../components/auth-form';
import {
	getAuthError,
	getAuthLoading,
	getAuthValidationError,
	getIsAuth,
} from '../../redux/services/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { resetErrors } from '../../redux/services/auth/auth.slice';
import { Loader } from '../../components/loader';

export const Login = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const loading = useAppSelector(getAuthLoading);

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

	const onSubmit = (values: LoginType) => {
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

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);

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

			<Loader open={loading} />
		</AuthForm>
	);
};
