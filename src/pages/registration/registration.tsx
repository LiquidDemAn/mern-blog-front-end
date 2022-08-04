import { useAppDispach } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { registerType } from '../../redux/services/auth/typedef';
import { AuthWrapper } from '../../components/auth-wrapper';
import { Avatar, TextField, Button } from '@mui/material';

export const Registration = () => {
	const dispatch = useAppDispach();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			fullName: '',
		},
		mode: 'onChange',
	});

	const onSubmit = (value: registerType) => {
		console.log(value);
	};

	return (
		<AuthWrapper title='Registration'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Avatar sx={{ width: 100, height: 100 }} />

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

				<Button type='submit' size='large' variant='contained' fullWidth>
					Register
				</Button>
			</form>
		</AuthWrapper>
	);
};
