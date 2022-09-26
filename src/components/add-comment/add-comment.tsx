import styles from './add-comment.module.scss';
import { useState } from 'react';
import { TextField, Avatar, Button } from '@mui/material';
import { useAppSelector } from '../../redux/store/hooks';
import { getUserAvatar } from '../../redux/services/auth/selectors';
import { PathsEnum } from '../../typedef';

type Props = {
	isLoading?: boolean;
	createComment: (text: string) => Promise<void>;
};

export const AddComment = ({ isLoading, createComment }: Props) => {
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
						fullWidth
						disabled={isLoading}
					/>
					<Button
						disabled={isLoading}
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
