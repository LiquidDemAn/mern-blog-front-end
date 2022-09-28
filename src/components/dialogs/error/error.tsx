import { ReactElement } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';

type Props = {
	title?: string;
	children?: ReactElement | ReactElement[];
	open: boolean;
	handleClose: () => void;
};

export const ErrorDialog = ({ title, children, open, handleClose }: Props) => {
	return (
		<Dialog
			open={open}
			aria-labelledby='error-title'
			aria-describedby='error-description'
			fullWidth
		>
			<DialogTitle id='error-title'>{title ? title : 'Error!'}</DialogTitle>
			<DialogContent>
				<DialogContentText id='error-description'>
					{children ? children : 'Something went wrong...'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
