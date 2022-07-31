import { Auth, AuthEnum } from '../../components/auth';

export const Login = () => {
	return <Auth authType={AuthEnum.Login} />;
};
