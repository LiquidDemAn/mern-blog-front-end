import styles from './add-comment.module.scss';
import { useState } from 'react';
import { TextField, Avatar, Button } from '@mui/material';
import { useAppSelector } from '../../redux/store/hooks';
import { getUserAvatar } from '../../redux/services/auth/selectors';
import { PathsEnum } from '../../typedef';

type Props = {
	commentLoading?: boolean;
	createComment: (text: string) => Promise<void>;
};

export const AddComment = ({ commentLoading, createComment }: Props) => {
	const userAvatar = useAppSelector(getUserAvatar);
	const [value, setValue] = useState('');

	const handleSubmit = () => {
		if (value) {
			createComment(value).then(() => {
				setValue('');
			});
		}
	};

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={PathsEnum.Server + userAvatar}
				/>
				<div className={styles.form}>
					<TextField
						onChange={(event) => setValue(event.target.value)}
						value={value}
						label='Write a comment'
						variant='outlined'
						maxRows={10}
						multiline
						fullWidth
						disabled={commentLoading}
					/>
					<Button
						disabled={commentLoading}
						onClick={handleSubmit}
						variant='contained'
					>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};
