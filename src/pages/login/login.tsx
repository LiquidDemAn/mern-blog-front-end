import { loginUser } from '../../redux/services/auth/actions';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { useForm } from 'react-hook-form';
import { LoginType, ParamsEnum } from '../../redux/services/auth/typedef';
import {
	getAuthError,
	getAuthLoading,
	getAuthValidationParams,
	getIsAuth,
} from '../../redux/services/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { resetErrors } from '../../redux/services/auth/auth.slice';
import { Loader } from '../../components/loader';
import { LoginView } from './view';
import { PathsEnum } from '../../typedef';

export const Login = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const loading = useAppSelector(getAuthLoading);

	const error = useAppSelector(getAuthError);
	const params = useAppSelector(getAuthValidationParams);

	const emailError = params?.includes(ParamsEnum.Email);
	const passwordError = params?.includes(ParamsEnum.Password);

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
		return <Navigate to={PathsEnum.Home} />;
	}

	return (
		<>
			<LoginView
				isValid={isValid}
				errors={errors}
				error={error}
				handleSubmit={handleSubmit}
				register={register}
				onSubmit={onSubmit}
			/>

			<Loader open={loading} />
		</>
	);
};
