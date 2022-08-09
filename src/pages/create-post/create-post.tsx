import React from 'react';
import { TextField, Paper, Button } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './create-post.module.scss';
import { useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../local-storage';

export const CreatePost = () => {
	const imageUrl = '';
	const [value, setValue] = React.useState('');
	const isAuth = useAppSelector(getIsAuth);
	const token = getToken();

	const handleChangeFile = () => {};

	const onClickRemoveImage = () => {};

	const onChange = React.useCallback((value: any) => {
		setValue(value);
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '200px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				uniqueId: 'save',
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (!token && !isAuth) {
		return <Navigate to='/login' />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button variant='outlined' size='large'>
				Загрузить превью
			</Button>
			<input type='file' onChange={handleChangeFile} hidden />
			{imageUrl && (
				<Button variant='contained' color='error' onClick={onClickRemoveImage}>
					Удалить
				</Button>
			)}
			{imageUrl && (
				<img
					className={styles.image}
					src={`http://localhost:4444${imageUrl}`}
					alt='Uploaded'
				/>
			)}
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size='large' variant='contained'>
					Опубликовать
				</Button>
				<a href='/'>
					<Button size='large'>Отмена</Button>
				</a>
			</div>
		</Paper>
	);
};
