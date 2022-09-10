import styles from './create-post.module.scss';
import 'easymde/dist/easymde.min.css';
import { ChangeEvent, useMemo, useRef } from 'react';
import { Paper, Button, TextField } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import { Link } from 'react-router-dom';
import { CreatePostType } from '../create-post';
import { PathsEnum } from '../../../typedef';

type Props = {
	post: CreatePostType;
	link: string;
	isEditing: boolean;
	handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
	onTags: (event: ChangeEvent<HTMLInputElement>) => void;
	onTitle: (event: ChangeEvent<HTMLInputElement>) => void;
	onText: (text: string) => void;
	onSubmit: () => Promise<void>;
	onRemoveImage: () => void;
};

export const CreatePostView = ({
	post,
	link,
	isEditing,
	handleChangeFile,
	onRemoveImage,
	onTitle,
	onText,
	onTags,
	onSubmit,
}: Props) => {
	const fileRef = useRef<null | HTMLInputElement>(null);

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

	return (
		<>
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
		</>
	);
};
