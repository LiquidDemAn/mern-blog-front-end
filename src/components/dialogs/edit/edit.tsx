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
	onEdit: () => void;
};

export const EditDialog = ({
	title,
	children,
	open,
	handleClose,
	onEdit,
}: Props) => {
	return (
		<Dialog
			open={open}
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
				<Button variant='contained' onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={onEdit} variant='contained' color='success'>
					Edit
				</Button>
			</DialogActions>
		</Dialog>
	);
};
