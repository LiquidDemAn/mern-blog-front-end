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
	closeHandle: () => void;
	onSubmit: () => void;
};

export const EditDialog = ({
	title,
	children,
	open,
	closeHandle,
	onSubmit,
}: Props) => {
	return (
		<Dialog
			open={open}
			onClose={closeHandle}
			aria-labelledby='edit-title'
			aria-describedby='edit-description'
			fullWidth
		>
			<DialogTitle id='edit-title'>{title ? title : 'Editing!'}</DialogTitle>
			<DialogContent>
				<DialogContentText id='edit-description'>
					{children ? children : 'Are you sure you want to edit this?'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={closeHandle}>
					Cancel
				</Button>
				<Button onClick={onSubmit} variant='contained' color='success'>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};
