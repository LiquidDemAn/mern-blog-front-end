import styles from './header.module.scss';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispach, useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { logOut } from '../../redux/services/auth/auth.slice';
import { PathsEnum } from '../../typedef';
import { MobileMenu } from '../mobile-menu';

export const Header = () => {
	const dispatch = useAppDispach();
	const isAuth = useAppSelector(getIsAuth);

	const onLogOut = () => {
		dispatch(logOut());
	};

	return (
		<header className={styles.header}>
			<Container maxWidth='lg'>
				<div className={styles.content}>
					<Link to={PathsEnum.Home} className={styles.logo}>
						MERN BLOG
					</Link>

					<div className={styles.menu}>
						<MobileMenu isAuth={isAuth} onLogOut={onLogOut} />
					</div>

					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to={PathsEnum.CreatePost}>
									<Button variant='contained'>Write a post</Button>
								</Link>
								<Button onClick={onLogOut} variant='contained' color='error'>
									Log out
								</Button>
							</>
						) : (
							<>
								<Link to={PathsEnum.Login}>
									<Button variant='outlined'>Log in</Button>
								</Link>
								<Link to={PathsEnum.Register}>
									<Button variant='contained'>Create account</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
};
