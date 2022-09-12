import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { customeAxios } from '../../redux/axios';
import { getUserId } from '../../redux/services/auth/selectors';
import { getDeletePostLoading } from '../../redux/services/posts/selectors';
import { FullPostType } from '../../redux/services/posts/typedef';
import { useAppSelector } from '../../redux/store/hooks';
import { FullPostView } from './view';

export const FullPost = () => {
	const { id } = useParams();
	const userId = useAppSelector(getUserId);
	const [error, setError] = useState<AxiosError | null>(null);
	const [post, setPost] = useState<FullPostType | null>(null);

	const deleteLoading = useAppSelector(getDeletePostLoading);

	useEffect(() => {
		const loadPost = async () => {
			setError(null);

			const response = await customeAxios.get(`/posts/${id}`);
			setPost(response.data);
		};

		loadPost().catch((error: AxiosError) => {
			console.warn(error);
			setError(error);
		});
	}, [id]);

	return (
		<>
			<FullPostView userId={userId} error={error} post={post} />
			<Loader open={deleteLoading} />
		</>
	);
};
