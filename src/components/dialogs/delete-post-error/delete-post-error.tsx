import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import { useAppSelector } from '../../../redux/store/hooks';
import { getDeletePostError } from '../../../redux/services/posts/selectors';

export const DeletePostError = () => {
	const error = useAppSelector(getDeletePostError);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (error) {
			handleOpen();
		}
	}, [error]);

	useEffect(() => {}, []);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='delete-post-error-title'
			aria-describedby='delete-post-error-description'
		>
			<DialogTitle id='delete-post-error-title'>Deletion error!</DialogTitle>
			<DialogContent>
				<DialogContentText id='delete-post-error-description'>
					Something went wrong! Try again later...
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
