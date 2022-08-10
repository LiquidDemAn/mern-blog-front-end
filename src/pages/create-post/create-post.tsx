import {
	useRef,
	useEffect,
	useCallback,
	useMemo,
	useState,
	ChangeEvent,
} from 'react';
import { TextField, Paper, Button } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './create-post.module.scss';
import { useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../local-storage';
import { customeAxios } from '../../redux/axios';
import { Link } from 'react-router-dom';
import { PostType } from '../../redux/services/posts/typedef';

export const CreatePost = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [text, setText] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [tags, setTags] = useState('');
	const [title, setTitle] = useState('');

	const fileRef = useRef<null | HTMLInputElement>(null);

	const token = getToken();
	const isAuth = useAppSelector(getIsAuth);
	const isEditing = Boolean(id);

	useEffect(() => {
		if (id) {
			customeAxios.get(`/posts/${id}`).then((res) => {
				const data = res.data as PostType;

				setImageUrl(data.imageUrl ? data.imageUrl : '');
				setText(data.text);
				setTags(data.tags.join(', '));
				setTitle(data.title);
			});
		} else {
			setImageUrl('');
			setText('');
			setTags('');
			setTitle('');
		}
	}, [id]);

	const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData();
			const files = event.target.files;

			if (files) {
				const file = files[0];
				formData.append('image', file);
				const { data } = await customeAxios.post('/upload', formData);
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
				title,
				tags,
			};

			const { data } = isEditing
				? await customeAxios.patch(`/posts/${id}`, params)
				: await customeAxios.post('/posts', params);

			navigate(`/posts/${data}`);
		} catch (error) {
			console.warn(error);
			alert('Error');
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
				onChange={(event) => {
					setTitle(event.target.value);
				}}
				value={title}
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
			/>
			<TextField
				onChange={(event) => {
					setTags(event.target.value);
				}}
				value={tags}
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
					{isEditing ? 'Save' : 'Publish'}
				</Button>
				<Link to='/'>
					<Button size='large'>Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};
