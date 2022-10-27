import styles from './users-search.module.scss';
import {
	Button,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { FindUsersEnum } from '../../../typedef';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispach } from '../../../redux/store/hooks';
import { findUsers } from '../../../redux/services/user/actions';
import { FoundUserType } from '../../../redux/services/user/typedef';
import { AxiosError } from 'axios';

type Props = {
	setData: (data: FoundUserType[] | null) => void;
	setLoading: (value: boolean) => void;
	setError: (error: AxiosError) => void;
};

export const UsersSearch = ({ setData, setLoading, setError }: Props) => {
	const dispatch = useAppDispach();

	const [selectValue, setSelectValue] = useState(FindUsersEnum.NickName);
	const findRef = useRef<HTMLInputElement | null>(null);

	const onSelectChange = (event: SelectChangeEvent) => {
		setSelectValue(event.target.value as FindUsersEnum);
	};

	const onFind = (event: FormEvent) => {
		event.preventDefault();

		const value = findRef.current?.value;

		if (value) {
			setLoading(true);

			dispatch(
				findUsers({
					selectValue,
					value,
					setData,
					setLoading,
					setError,
				})
			);
		}
	};

	return (
		<>
			<div className={styles.select}>
				<label>Search by:</label>
				<Select
					displayEmpty
					value={selectValue}
					onChange={onSelectChange}
					id='find-users-select'
					size='small'
				>
					<MenuItem value={FindUsersEnum.NickName}>
						{FindUsersEnum.NickName}
					</MenuItem>
					<MenuItem value={FindUsersEnum.FullName}>
						{FindUsersEnum.FullName}
					</MenuItem>
				</Select>
			</div>

			<form onSubmit={onFind} className={styles.search}>
				<TextField
					inputRef={findRef}
					id='find-person'
					label={
						selectValue === FindUsersEnum.NickName
							? 'Enter nickname'
							: 'Enter fullname'
					}
					variant='outlined'
					size='small'
					fullWidth
				/>
				<Button onClick={onFind} variant='contained'>
					Find
				</Button>
			</form>
		</>
	);
};
