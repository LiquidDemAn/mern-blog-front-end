import { useRef, useCallback, useMemo, useState, ChangeEvent } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './create-post.module.scss';
import { useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken } from '../../local-storage';
import { customeAxios } from '../../redux/axios';

export const CreatePost = () => {
	const navigate = useNavigate();
	const [text, setText] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const titleRef = useRef<null | HTMLInputElement>(null);
	const tagsRef = useRef<null | HTMLInputElement>(null);
	const fileRef = useRef<null | HTMLInputElement>(null);

	const isAuth = useAppSelector(getIsAuth);
	const token = getToken();

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData();
			const files = event.target.files;

			if (files) {
				const file = files[0];
				formData.append('image', file);
				const { data } = await customeAxios.post('/upload', formData);
				console.log(data);
				setImageUrl(data.url);
			}
		} catch (error) {
			console.warn(error);
			alert('Error uploading the file');
		}
	};

	const onRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = useCallback((value: string) => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setLoading(true);

			const params = {
				text,
				imageUrl,
				title: titleRef.current?.value,
				tags: tagsRef.current?.value,
			};

			const { data } = await customeAxios.post('/posts', params);
			const id = data._id;

			navigate(`/posts/${id}`);
		} catch (error) {
			console.warn(error);
			alert('Error while creating post');
		}
	};

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '260px',
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
			<Button
				onClick={() => fileRef.current?.click()}
				variant='outlined'
				size='large'
			>
				Загрузить превью
			</Button>
			<input type='file' ref={fileRef} onChange={handleChangeFile} hidden />
			{imageUrl && (
				<>
					<Button variant='contained' color='error' onClick={onRemoveImage}>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4444${imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}

			<TextField
				inputRef={titleRef}
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
			/>
			<TextField
				inputRef={tagsRef}
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size='large' variant='contained'>
					Опубликовать
				</Button>
				<a href='/'>
					<Button size='large'>Отмена</Button>
				</a>
			</div>
		</Paper>
	);
};
