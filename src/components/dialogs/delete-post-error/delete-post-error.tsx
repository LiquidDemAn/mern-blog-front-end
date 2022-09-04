import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import { useAppDispach, useAppSelector } from '../../../redux/store/hooks';
import { getDeletePostError } from '../../../redux/services/posts/selectors';
import { removeDeletePostError } from '../../../redux/services/posts/posts.slice';

export const DeletePostError = () => {
	const dispatch = useAppDispach();
	const error = useAppSelector(getDeletePostError);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(removeDeletePostError());
	};

	useEffect(() => {
		if (error) {
			handleOpen();
		}
	}, [error]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='delete-post-error-title'
			aria-describedby='delete-post-error-description'
		>
			<DialogTitle id='delete-post-error-title'>Deletion ERROR!</DialogTitle>
			<DialogContent>
				<>
					{error?.status === 500 && (
						<DialogContentText id='delete-post-error-description'>
							Something went wrong! Try again later...
						</DialogContentText>
					)}

					{error?.status === 404 && (
						<DialogContentText id='delete-post-error-description'>
							Post not found!
						</DialogContentText>
					)}
				</>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
