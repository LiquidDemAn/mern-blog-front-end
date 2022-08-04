import { TextField, Button } from '@mui/material';
import { loginUser } from '../../redux/services/auth/actions';
import { useAppDispach } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { loginType } from '../../redux/services/auth/typedef';
import { AuthWrapper } from '../../components/auth-wrapper';

export const Login = () => {
	const dispatch = useAppDispach();

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

	const onSubmit = (value: loginType) => {
		dispatch(loginUser(value));
	};

	return (
		<AuthWrapper title='Login'>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<Button type='submit' size='large' variant='contained' fullWidth>
					Login
				</Button>
			</form>
		</AuthWrapper>
	);
};
