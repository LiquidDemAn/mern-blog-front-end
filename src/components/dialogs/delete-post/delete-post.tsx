import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';

type Props = {
	open: boolean;
	handleClose: () => void;
	handleDelete: () => void;
};

export const DeletePost = ({ open, handleClose, handleDelete }: Props) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='delete-post-title'
			aria-describedby='delete-post-description'
		>
			<DialogTitle id='delete-post-title'>Deleting a post!</DialogTitle>
			<DialogContent>
				<DialogContentText id='delete-post-description'>
					Do you really want to delete this post?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='contained' color='error' onClick={handleDelete}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
