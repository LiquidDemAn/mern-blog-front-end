import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../typedef';

type Props = {
	isAuth: boolean;
	onLogOut: () => void;
};

export const MobileMenu = ({ isAuth, onLogOut }: Props) => {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onCreatePost = () => {
		navigate(PathsEnum.CreatePost);
		handleClose();
	};

	const onLogin = () => {
		navigate(PathsEnum.Login);
		handleClose();
	};

	const onRegister = () => {
		navigate(PathsEnum.Register);
		handleClose();
	};

	return (
		<>
			<Button
				id='menu-button'
				aria-controls={open ? 'menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MenuIcon color='action' />
			</Button>

			<Menu
				id='menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'menu-button',
				}}
			>
				{isAuth ? (
					<>
						<MenuItem onClick={onCreatePost}>Write a post</MenuItem>
						<MenuItem onClick={onLogOut}>Log out</MenuItem>
					</>
				) : (
					<>
						<MenuItem onClick={onLogin}>Log in</MenuItem>
						<MenuItem onClick={onRegister}>Create account</MenuItem>
					</>
				)}
			</Menu>
		</>
	);
};
