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
	onDelete: () => void;
};

export const DeleteDialog = ({
	title,
	children,
	open,
	handleClose,
	onDelete,
}: Props) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='delete-title'
			aria-describedby='delete-description'
		>
			<DialogTitle id='delete-title'>{title ? title : 'Deleting!'}</DialogTitle>
			<DialogContent>
				<DialogContentText id='delete-description'>
					{children ? children : 'Do you really want to delete this?'}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={onDelete} variant='contained' color='error'>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
