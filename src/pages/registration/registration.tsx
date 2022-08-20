import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { registerType } from '../../redux/services/auth/typedef';
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

	console.log(avatar);

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
		},
		mode: 'onChange',
	});

	const onSubmit = (values: registerType) => {
		dispatch(registerUser(values));
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
				helperText={errors.fullName?.message}
				id='full-name'
				{...register('fullName', { required: 'Enter full name' })}
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
				helperText={errors.password?.message}
				type='password'
				id='password'
				{...register('password', { required: 'Enter password' })}
			/>
		</AuthForm>
	);
};
