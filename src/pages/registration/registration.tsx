import Typography from '@mui/material/Typography';
import { TextField, Paper, Button, Avatar } from '@mui/material';

import { Auth, AuthEnum } from '../../components/auth';

export const Registration = () => {
	return <Auth authType={AuthEnum.Registration} />;
};
