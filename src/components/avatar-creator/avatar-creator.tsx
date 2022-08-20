import AvatarEditor from 'react-avatar-editor';
import styles from './avatar-creator.module.scss';
import { Avatar, Button } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
	setAvatar: (valuse: string) => void;
};

type ConfigsType = {
	image: string | File;
	allowZoomOut: boolean;
	scale: number;
	rotate: number;
	borderRadius: number;
	width: number;
	height: number;
	position?: { x: number; y: number };
};

export const AvatarCreator = ({ setAvatar }: Props) => {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [preview, setPreview] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [configs, setConfigs] = useState<ConfigsType>({
		image: '',
		allowZoomOut: false,
		scale: 1,
		rotate: 0,
		borderRadius: 0,
		width: 200,
		height: 200,
	});

	const fileRef = useRef<null | HTMLInputElement>(null);
	const editorRef = useRef<AvatarEditor | null>(null);

	const image = editorRef.current?.getImageScaledToCanvas().toDataURL();

	const previewDelay = () => {
		setTimeout(() => {
			setPreview(true);
		}, 500);
	};

	const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files?.length) {
			setPreview(false);
			setFileLoaded(true);
			setIsEdit(true);

			setConfigs({
				...configs,
				scale: 1,
				position: { x: 0.5, y: 0.5 },
				image: files[0],
			});

			previewDelay();
		}
	};

	const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
		const scale = parseFloat(e.target.value);
		setConfigs({ ...configs, scale });
	};

	const handleSave = () => {
		setIsEdit(false);

		if (image) {
			setAvatar(image);
		}
	};

	const handlePositionChange = (position: { x: number; y: number }) => {
		setConfigs({
			...configs,
			position,
		});
	};

	const handleEdit = () => {
		setIsEdit(true);
		setPreview(false);

		previewDelay();
	};

	return (
		<>
			{fileLoaded && (
				<>
					<div className={styles.images}>
						{isEdit && (
							<AvatarEditor
								onPositionChange={handlePositionChange}
								ref={editorRef}
								{...configs}
							/>
						)}
						{preview && <Avatar src={image} sx={{ width: 100, height: 100 }} />}
					</div>

					{isEdit && (
						<>
							<input
								name='scale'
								type='range'
								onChange={handleScale}
								min={configs.allowZoomOut ? 0.1 : 1}
								max='2'
								step='0.01'
								defaultValue='1'
							/>
							<Button
								onClick={() => fileRef.current?.click()}
								variant='contained'
								size='medium'
								fullWidth
							>
								Load another image
							</Button>
						</>
					)}
				</>
			)}
			{!fileLoaded && !isEdit && (
				<>
					<Button
						onClick={() => fileRef.current?.click()}
						variant='contained'
						size='large'
						fullWidth
					>
						Load avatar
					</Button>
				</>
			)}
			<input type='file' ref={fileRef} onChange={handleNewImage} hidden />

			{fileLoaded && (
				<>
					{isEdit && (
						<Button
							color='success'
							variant='contained'
							onClick={handleSave}
							fullWidth
						>
							Save avatar
						</Button>
					)}
					{!isEdit && (
						<Button
							color='secondary'
							variant='contained'
							onClick={handleEdit}
							fullWidth
						>
							Edit Avatar
						</Button>
					)}
				</>
			)}
		</>
	);
};
