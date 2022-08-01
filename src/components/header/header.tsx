import styles from './header.module.scss';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../app/App';

export const Header = () => {
	const isAuth = false;

	const onClickLogout = () => {};

	return (
		<header className={styles.header}>
			<Container maxWidth='lg'>
				<div className={styles.content}>
					<Link to='' className={styles.logo}>
						MERN BLOG
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to={PathsEnum.CreatePost}>
									<Button variant='contained'>Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to={PathsEnum.Login}>
									<Button variant='outlined'>Войти</Button>
								</Link>
								<Link to={PathsEnum.Register}>
									<Button variant='contained'>Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
};
