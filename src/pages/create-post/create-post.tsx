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
import { PathsEnum } from '../../app/App';

export const CreatePost = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState({
		title: '',
		tags: '',
		text: '',
		imageUrl: '',
	});

	const [link, setLink] = useState('');

	// const [loading, setLoading] = useState(false);

	const fileRef = useRef<null | HTMLInputElement>(null);

	const token = getToken();
	const isAuth = useAppSelector(getIsAuth);
	const isEditing = Boolean(id);

	const reader = new FileReader();

	useEffect(() => {
		if (id) {
			customeAxios.get(`/posts/${id}`).then(({ data }) => {
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

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const files = event.target.files;

			if (files) {
				const file = files[0];

				reader.readAsDataURL(file);

				reader.onloadend = () => {
					const result = reader.result;
					if (typeof result === 'string') {
						setLink(result);
					}
				};
			}
		} catch (error) {
			console.warn(error);
			alert('Error uploading the file');
		}
	};

	const onRemoveImage = () => {
		if (isEditing) {
			setLink('');
			setPost((post) => {
				return {
					...post,
					imageUrl: '',
				};
			});
		} else {
			setLink('');
		}
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

			if (isEditing) {
				if (link) {
					await customeAxios
						.post('/upload', { url: link })
						.then(async ({ data }) => {
							await customeAxios.patch(`/posts/${id}`, {
								...post,
								imageUrl: data.url,
							});
						});
				} else {
					await customeAxios.patch(`/posts/${id}`, post);
				}

				navigate(`/posts/${id}`);
			} else {
				if (link) {
					await customeAxios
						.post('/upload', { url: link })
						.then(async ({ data }) => {
							const res = await customeAxios.post('/posts', {
								...post,
								imageUrl: data.url,
							});
							navigate(`/posts/${res.data}`);
						});
				} else {
					const { data } = await customeAxios.post('/posts', post);
					navigate(`/posts/${data}`);
				}
			}
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
			placeholder: 'Enter text...',
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
		return <Navigate to={PathsEnum.Login} />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<div className={styles.preview_buttons}>
				<Button
					onClick={() => fileRef.current?.click()}
					variant='outlined'
					size='large'
				>
					Download preview
				</Button>
				<input
					type='file'
					accept='.png, .jpg, .jpeg'
					ref={fileRef}
					onChange={handleChangeFile}
					hidden
				/>
				{(link || post.imageUrl) && (
					<Button
						variant='contained'
						size='large'
						color='error'
						onClick={onRemoveImage}
					>
						Delete preview
					</Button>
				)}
			</div>

			{(link || post.imageUrl) && (
				<>
					{isEditing ? (
						<img
							className={styles.image}
							src={link ? link : `${PathsEnum.Server}${post.imageUrl}`}
							alt='Uploaded'
						/>
					) : (
						<img className={styles.image} src={link} alt='Uploaded' />
					)}
				</>
			)}

			<TextField
				onChange={onTitle}
				value={post.title}
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Article title...'
				fullWidth
			/>
			<TextField
				onChange={onTags}
				value={post.tags}
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Tags'
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
