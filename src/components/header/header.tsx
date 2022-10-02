import styles from './header.module.scss';
import { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { logOut } from '../../redux/services/auth/auth.slice';
import { PathsEnum } from '../../typedef';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

import {
	getIsAuth,
	getUserAvatar,
	getUserName,
} from '../../redux/services/auth/selectors';

import {
	Avatar,
	Button,
	Container,
	Menu,
	MenuItem,
	SvgIcon,
} from '@mui/material';

export const Header = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const onLogOut = () => {
		dispatch(logOut());
	};

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

	const userAvatar = useAppSelector(getUserAvatar);
	const userName = useAppSelector(getUserName);

	return (
		<header className={styles.header}>
			<Container maxWidth='lg'>
				<div className={styles.content}>
					<Link to={PathsEnum.Home} className={styles.logo}>
						MERN BLOG
					</Link>

					<Button
						id='menu-button'
						className={styles.avatar}
						onClick={handleClick}
						aria-controls={open ? 'menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						{isAuth ? (
							<>
								<Avatar
									alt={userName}
									src={`${PathsEnum.Server}${userAvatar}`}
								/>
								<SvgIcon htmlColor='black' fontSize='medium'>
									<ArrowDropDownIcon />
								</SvgIcon>
							</>
						) : (
							<MenuIcon color='action' fontSize='large' />
						)}
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
				</div>
			</Container>
		</header>
	);
};
