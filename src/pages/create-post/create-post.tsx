import { useEffect, useCallback, useState, ChangeEvent } from 'react';
import { useAppSelector } from '../../redux/store/hooks';
import { getIsAuth } from '../../redux/services/auth/selectors';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../local-storage';
import { customeAxios } from '../../redux/axios';
import { PathsEnum } from '../../typedef';
import { Loader } from '../../components/loader';
import { CreatePostView } from './view';

export type CreatePostType = {
	title: string;
	tags: string;
	text: string;
	imageUrl: string;
};

export const CreatePost = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [post, setPost] = useState<CreatePostType>({
		title: '',
		tags: '',
		text: '',
		imageUrl: '',
	});

	const [link, setLink] = useState('');

	const [loading, setLoading] = useState(false);

	const token = getToken();
	const isAuth = useAppSelector(getIsAuth);
	const isEditing = Boolean(id);

	const reader = new FileReader();

	useEffect(() => {
		if (id) {
			setLoading(true);

			customeAxios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setLoading(false);

					setPost({
						imageUrl: data.imageUrl ? data.imageUrl : '',
						text: data.text,
						title: data.title,
						tags: data.tags.join(', '),
					});
				})
				.catch((err) => {
					// setLoading(false)
					console.log(err);
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
		} catch (error) {
			setLoading(false);
			console.warn(error);
			alert('Error');
		}
	};

	if (!token && !isAuth) {
		return <Navigate to={PathsEnum.Login} />;
	}

	return (
		<>
			<CreatePostView
				post={post}
				link={link}
				isEditing={isEditing}
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
