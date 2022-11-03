import { useEffect, useCallback, useState, ChangeEvent } from 'react';
import { useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/user/selectors';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../local-storage';
import { customeAxios } from '../../redux/axios';
import { ErrorType, PathsEnum } from '../../typedef';
import { Loader } from '../../components/common/loader';
import { CreatePostView } from './view';
import { AxiosError } from 'axios';

export type CreatePostType = {
	title: string;
	tags: string;
	text: string;
	imageUrl: string;
};

export type CreatPostValidErrorType = {
	param: 'title' | 'text' | 'tags';
	msg?: string;
	value?: string;
};

export const CreatePost = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [open, setOpen] = useState(false);

	const [post, setPost] = useState<CreatePostType>({
		title: '',
		tags: '',
		text: '',
		imageUrl: '',
	});

	const [link, setLink] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ErrorType | null>(null);

	const [validError, setValidError] = useState<
		CreatPostValidErrorType[] | null
	>(null);

	const token = getToken();
	const isAuth = useAppSelector(getIsAuth);
	const isEditing = Boolean(id);

	const reader = new FileReader();

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
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
			setLoading(true);

			if (isEditing) {
				if (link) {
					await customeAxios
						.post('/upload', { url: link })
						.then(async ({ data }) => {
							await customeAxios
								.patch(`/posts/${id}`, {
									...post,
									imageUrl: data.url,
								})
								.then(() => {
									setLoading(false);
								});
						});
				} else {
					await customeAxios.patch(`/posts/${id}`, post).then(() => {
						setLoading(false);
					});
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
		} catch (err) {
			const error = err as AxiosError;

			console.log(error);

			if (error.response?.status === 403) {
				setValidError(error.response.data as CreatPostValidErrorType[]);
			} else {
				setError({
					status: error.response?.status,
					message: error.message,
				});
			}

			setOpen(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			setLoading(true);

			customeAxios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setPost({
						imageUrl: data.imageUrl ? data.imageUrl : '',
						text: data.text,
						title: data.title,
						tags: data.tags.join(', '),
					});

					setLoading(false);
				})
				.catch((err) => {
					const error = err as AxiosError;
					console.log(error);

					setError({
						status: error.response?.status,
						message: error.message,
					});

					setLoading(false);
					setOpen(true);
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

	if (!token && !isAuth) {
		return <Navigate to={PathsEnum.Login} />;
	}

	return (
		<>
			<CreatePostView
				post={post}
				open={open}
				validError={validError}
				handleClose={handleClose}
				link={link}
				isEditing={isEditing}
				error={error}
				handleChangeFile={handleChangeFile}
				onTags={onTags}
				onText={onText}
				onSubmit={onSubmit}
				onRemoveImage={onRemoveImage}
				onTitle={onTitle}
			/>

			<Loader open={loading} />
		</>
	);
};
