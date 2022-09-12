import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { ParamsEnum, RegisterType } from '../../redux/services/auth/typedef';
import { AuthForm } from '../../components/auth-form';
import { Alert, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import {
	getAuthError,
	getAuthLoading,
	getAuthValidationError,
	getIsAuth,
} from '../../redux/services/auth/selectors';
import { registerUser } from '../../redux/services/auth/actions';
import { AvatarCreator } from '../../components/avatar-creator';
import { useState, useEffect } from 'react';
import { resetErrors } from '../../redux/services/auth/auth.slice';
import { Loader } from '../../components/loader';

export const Registration = () => {
	const [avatar, setAvatar] = useState('');

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: 'demon@gmail.com',
			password: '',
			fullName: 'Dexter Morgan',
			nickName: 'ND_Dexter',
			avatarUrl: avatar,

			// email: '',
			// password: '',
			// fullName: '',
			// nickName: '',
			// avatarUrl: avatar,
		},
		mode: 'onChange',
	});

	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);
	const loading = useAppSelector(getAuthLoading);
	const error = useAppSelector(getAuthError);
	const validationError = useAppSelector(getAuthValidationError);

	const fullNameError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.FullName;
		})
	);

	const nickNameError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.NickName;
		})
	);

	const emailError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.Email;
		})
	);

	const passwordError = Boolean(
		validationError?.data.find((item) => {
			return item.param === ParamsEnum.Password;
		})
	);


	useEffect(() => {
		if (fullNameError) {
			setError('fullName', {
				type: 'fullName',
				message: 'Full name is not correct!',
			});
		}
	}, [setError, fullNameError]);

	useEffect(() => {
		if (nickNameError) {
			setError('nickName', {
				type: 'nickName',
				message: 'Nick name is not correct!',
			});
		}
	}, [setError, nickNameError]);

	useEffect(() => {
		if (passwordError) {
			setError('password', {
				type: 'password',
				message: 'Password is not correct!',
			});
		}
	}, [setError, passwordError]);

	useEffect(() => {
		if (emailError) {
			setError('email', {
				type: 'email',
				message: 'Email is not correct!',
			});
		}
	}, [setError, emailError]);

	useEffect(() => {
		return () => {
			dispatch(resetErrors());
		};
	}, [dispatch]);
	const onSubmit = (values: RegisterType) => {
		if (avatar) {
			dispatch(
				registerUser({
					...values,
					avatarUrl: avatar,
				})
			);
		} else {
			dispatch(registerUser(values));
		}
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

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

			<Loader open={loading} />
		</AuthForm>
	);
};
