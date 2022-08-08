import { TextField } from '@mui/material';
import { loginUser } from '../../redux/services/auth/actions';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { loginType, userDataType } from '../../redux/services/auth/typedef';
import { AuthForm } from '../../components/auth-form';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { Navigate } from 'react-router-dom';

export const Login = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: 'test@gmail.com',
			password: '12345',
		},
		mode: 'onChange',
	});

	const onSubmit = (values: loginType) => {
		dispatch(loginUser(values));
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<AuthForm handleSubmit={handleSubmit} onSubmit={onSubmit} title='Login'>
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
