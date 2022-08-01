import clsx from 'clsx';
import { ReactElement } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './post.module.scss';
import { UserInfo } from '../user-info';
import { PostSkeleton } from './skeleton';
import { Link } from 'react-router-dom';
import { PostType } from '../../redux/services/posts/typedef';

type Props = {
	post?: PostType;
	children?: ReactElement | ReactElement[];
	isFullPost?: boolean;
	isLoading?: boolean;
	isEditable?: boolean;
};

export const Post = ({
	post,
	children,
	isFullPost,
	isLoading,
	isEditable,
}: Props) => {
	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = () => {};

	return (
		<>
			{post && (
				<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
					{isEditable && (
						<div className={styles.editButtons}>
							<Link to={`/posts/${post._id}/edit`}>
								<IconButton color='primary'>
									<EditIcon />
								</IconButton>
							</Link>
							<IconButton onClick={onClickRemove} color='secondary'>
								<DeleteIcon />
							</IconButton>
						</div>
					)}

					{post.imageUrl && (
						<img
							className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
							src={post.imageUrl}
							alt={post.title}
						/>
					)}

					<div className={styles.wrapper}>
						<UserInfo {...post.author} additionalText={post.createdAt} />
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
								{post.tags.map((name) => (
									<li key={name}>
										<Link to={`/tag/${name}`}>#{name}</Link>
									</li>
								))}
							</ul>

							{children && <div className={styles.content}>{children}</div>}

							<ul className={styles.postDetails}>
								<li>
									<EyeIcon />
									<span>{post.viewsCount}</span>
								</li>
								<li>
									<CommentIcon />
									{/* <span>{post.commentsCount}</span> */}
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
