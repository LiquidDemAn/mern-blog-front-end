import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { RegisterType } from '../../redux/services/auth/typedef';
import { AuthForm } from '../../components/auth-form';
import { TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { registerUser } from '../../redux/services/auth/actions';
import { AvatarCreator } from '../../components/avatar-creator';
import { useState } from 'react';

export const Registration = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);
	const [avatar, setAvatar] = useState('');

	const {
		register,
		handleSubmit,
		// setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			fullName: '',
			nickName: '',
			avatarUrl: avatar,
		},
		mode: 'onChange',
	});

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
					'Nickname must be at least 3 characters long, not contain spaces and special characters!'
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
