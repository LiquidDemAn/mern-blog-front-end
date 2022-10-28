import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SvgIcon } from '@mui/material';

import styles from './post.module.scss';
import { UserInfo } from '../../user/user-info';
import { PostSkeleton } from './skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { FullPostType, PostType } from '../../../redux/services/posts/typedef';
import { PathsEnum } from '../../../typedef';
import { useAppDispach, useAppSelector } from '../../../redux/store/hooks';
import {
	deletePost,
	likePost,
	unlikePost,
} from '../../../redux/services/posts/actions';
import { getUserId } from '../../../redux/services/user/selectors';
import { DeleteDialog } from '../../dialogs/delete';

type Props = {
	post?: PostType | FullPostType | null;
	children?: ReactElement | ReactElement[];
	isFullPost?: boolean;
	onLikeFullPost?: () => void;
	onUnlikeFullPost?: () => void;
};

export const Post = ({
	post,
	children,
	isFullPost,
	onLikeFullPost,
	onUnlikeFullPost,
}: Props) => {
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const userId = useAppSelector(getUserId);
	const postId = post?._id;
	const commentsCount = post?.comments.length;
	const isViewed = post?.viewersIds.includes(userId);
	const isLiked = post?.likesIds.includes(userId);
	const isEditable = userId === post?.author._id;

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		if (postId) {
			handleClose();

			dispatch(deletePost(post._id)).then(() => {
				navigate(PathsEnum.Home);
			});
		}
	};

	const likeHandle = () => {
		if (postId) {
			dispatch(likePost( postId ));
		}
	};

	const unlikeHandle = () => {
		if (postId) {
			dispatch(unlikePost({ postId }));
		}
	};

	if (!post) {
		return <PostSkeleton />;
	}

	return (
		<>
			<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
				{isEditable && (
					<div className={styles.editButtons}>
						<Link to={`/posts/${post._id}/edit`}>
							<IconButton color='primary'>
								<EditIcon />
							</IconButton>
						</Link>
						<IconButton onClick={handleOpen} color='secondary'>
							<DeleteIcon />
						</IconButton>
					</div>
				)}

				{post.imageUrl && (
					<img
						className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
						src={PathsEnum.Server + post.imageUrl}
						alt={post.title}
					/>
				)}

				<div className={styles.wrapper}>
					<UserInfo
						fullName={post.author.fullName}
						avatarUrl={post.author.avatarUrl}
						nickName={post.author.nickName}
					/>
					<div className={styles.indention}>
						<h2
							className={clsx(styles.title, {
								[styles.titleFull]: isFullPost,
							})}
						>
							{isFullPost ? (
								post.title
							) : (
								<Link to={`/posts/${post._id}`}>{post.title}</Link>
							)}
						</h2>

						<span className={styles.date}>
							{new Date(post.createdAt).toDateString()}
						</span>

						<ul className={styles.tags}>
							{post.tags.length !== 0 &&
								post.tags.map((name) => (
									<li key={name}>
										<Link to={`/tags/${name}`}>#{name}</Link>
									</li>
								))}
						</ul>

						{children && <div className={styles.content}>{children}</div>}

						<ul className={styles.postDetails}>
							<li>
								{isViewed ? (
									<SvgIcon htmlColor='red'>
										<EyeIcon />
									</SvgIcon>
								) : (
									<EyeIcon />
								)}

								<span>{post.viewsCount}</span>
							</li>
							{isFullPost ? (
								<li
									className={styles.like}
									onClick={isLiked ? onUnlikeFullPost : onLikeFullPost}
								>
									{isLiked ? (
										<SvgIcon htmlColor='red'>
											<FavoriteIcon />
										</SvgIcon>
									) : (
										<FavoriteBorderIcon />
									)}
									<span>{post.likesCount}</span>
								</li>
							) : (
								<li
									// onMouseOver={() => setQq(5)}
									// onMouseOut={() => setQq(1)}
									onClick={isLiked ? unlikeHandle : likeHandle}
									className={styles.like}
								>
									{isLiked ? (
										<SvgIcon htmlColor='red'>
											<FavoriteIcon />
										</SvgIcon>
									) : (
										<FavoriteBorderIcon />
									)}
									<span>{post.likesCount}</span>
								</li>
							)}
							<li>
								<CommentIcon />
								<span>{commentsCount}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<DeleteDialog
				title='Deleting a post!'
				onDelete={handleDelete}
				handleClose={handleClose}
				open={open}
			>
				<>Do you really want to delete this post?</>
			</DeleteDialog>
		</>
	);
};
