import React from 'react';
import Button from '@mui/material/Button';

import styles from './header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
	const isAuth = false;

	const onClickLogout = () => {};

	return (
		<header className={styles.header}>
			<Container maxWidth='lg'>
				<div className={styles.content}>
					<a className={styles.logo} href='/'>
						MERN BLOG
					</a>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<a href='/posts/create'>
									<Button variant='contained'>Написать статью</Button>
								</a>
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
								<a href='/login'>
									<Button variant='outlined'>Войти</Button>
								</a>
								<a href='/register'>
									<Button variant='contained'>Создать аккаунт</Button>
								</a>
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
};
