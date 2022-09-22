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
import { UserInfo } from '../user-info';
import { PostSkeleton } from './skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { FullPostType, PostType } from '../../redux/services/posts/typedef';
import { PathsEnum } from '../../typedef';
import { useAppDispach } from '../../redux/store/hooks';
import { deletePost } from '../../redux/services/posts/actions';
import { DeletePost } from '../dialogs/delete-post';

type Props = {
	post?: PostType | FullPostType | null;
	children?: ReactElement | ReactElement[];
	isFullPost?: boolean;
	isEditable?: boolean;
	likeHandle?: () => Promise<void>;
	isLiked?: boolean;
};

export const Post = ({
	post,
	children,
	isFullPost,
	isEditable,
	likeHandle,
	isLiked,
}: Props) => {
	const dispatch = useAppDispach();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		if (post?._id) {
			handleClose();

			dispatch(deletePost(post._id)).then(() => {
				navigate(PathsEnum.Home);
			});
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
					<UserInfo {...post.author} date={post.createdAt} />
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
								<EyeIcon />
								<span>{post.viewsCount}</span>
							</li>
							<li onClick={likeHandle}>
								{isLiked ? (
									<SvgIcon htmlColor='red'>
										<FavoriteIcon />
									</SvgIcon>
								) : (
									<FavoriteBorderIcon />
								)}
								<span>{post.likesCount}</span>
							</li>
							<li>
								<CommentIcon />
								{/* <span>{post.commentsCount}</span> */}
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Dialogs */}
			<DeletePost
				open={open}
				handleClose={handleClose}
				handleDelete={handleDelete}
			/>
		</>
	);
};
