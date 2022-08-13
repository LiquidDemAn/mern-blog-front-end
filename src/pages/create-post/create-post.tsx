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
import { FullPostType } from '../../redux/services/posts/typedef';

export const CreatePost = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState({
		title: '',
		tags: '',
		text: '',
		imageUrl: '',
	});

	// const [loading, setLoading] = useState(false);

	const fileRef = useRef<null | HTMLInputElement>(null);

	const token = getToken();
	const isAuth = useAppSelector(getIsAuth);
	const isEditing = Boolean(id);

	useEffect(() => {
		if (id) {
			customeAxios.get(`/posts/${id}`).then((res) => {
				const data = res.data as FullPostType;

				setPost({
					imageUrl: data.imageUrl ? data.imageUrl : '',
					text: data.text,
					title: data.title,
					tags: data.tags.join(', '),
				});
			});
		} else {
			setPost({
				title: '',
				tags: '',
				text: '',
				imageUrl: '',
			});
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

				setPost((post) => {
					return {
						...post,
						imageUrl: data.url,
					};
				});
			}
		} catch (error) {
			console.warn(error);
			alert('Error uploading the file');
		}
	};

	const onRemoveImage = () => {
		setPost((post) => {
			return {
				...post,
				imageUrl: '',
			};
		});
	};

	const onText = useCallback((text: string) => {
		setPost((post) => {
			return {
				...post,
				text,
			};
		});
	}, []);

	const onTitle = (event: ChangeEvent<HTMLInputElement>) => {
		setPost((post) => {
			return {
				...post,
				title: event.target.value,
			};
		});
	};

	const onTags = (event: ChangeEvent<HTMLInputElement>) => {
		setPost((post) => {
			
			return {
				...post,
				tags: event.target.value.toLowerCase(),
			};
		});
	};

	const onSubmit = async () => {
		try {
			// setLoading(true);

			const { data } = isEditing
				? await customeAxios.patch(`/posts/${id}`, post)
				: await customeAxios.post('/posts', post);

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
			{post.imageUrl && (
				<>
					<Button variant='contained' color='error' onClick={onRemoveImage}>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4444${post.imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}

			<TextField
				onChange={onTitle}
				value={post.title}
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				fullWidth
			/>
			<TextField
				onChange={onTags}
				value={post.tags}
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={post.text}
				onChange={onText}
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
