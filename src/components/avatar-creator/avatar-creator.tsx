import AvatarEditor, { CroppedRect } from 'react-avatar-editor';
import styles from './avatar-creator.module.scss';
import { Avatar, Button } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
	avatar?: string;
	setAvatar: (valuse: string) => void;
};

type PreviewType = {
	image: string;
	rect?: CroppedRect | undefined;
	scale: number;
	borderRadius: number;
	width: number;
	height: number;
};

type ConfigsType = {
	image: string | File;
	allowZoomOut: boolean;
	scale: number;
	preview: PreviewType | null;
	rotate: number;
	borderRadius: number;
	width: number;
	height: number;
};

export const AvatarCreator = ({ setAvatar, avatar }: Props) => {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [preview, setPreview] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const [configs, setConfigs] = useState<ConfigsType>({
		image: '',
		allowZoomOut: false,
		scale: 1,
		preview: null,
		rotate: 0,
		borderRadius: 0,
		width: 200,
		height: 200,
	});

	const fileRef = useRef<null | HTMLInputElement>(null);
	const editorRef = useRef<AvatarEditor | null>(null);
	const previewRef = useRef<null | HTMLButtonElement>(null);
	const image = editorRef.current?.getImageScaledToCanvas().toDataURL();

	const handleNewImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files?.length) {
			setTimeout(() => {
				previewRef.current?.click();
			}, 200);
			setAvatar(image);
			setPreview(false);
			setConfigs({ ...configs, image: files[0] });
			setFileLoaded(true);
			setIsEdit(true);
		}
	};

	const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
		const scale = parseFloat(e.target.value);
		setConfigs({ ...configs, scale });
	};

	const handlePreview = () => {
		setPreview(true);
	};

	const handleSave = () => {
		setIsEdit(false);
		setPreview(true);
		console.log(image);
	};

	const handleEdit = () => {
		setIsEdit(true);
		setPreview(false);
	};

	return (
		<>
			{fileLoaded && (
				<>
					<div className={styles.images}>
						{isEdit && (
							<AvatarEditor
								onImageChange={() =>
									setAvatar(
										editorRef.current?.getImageScaledToCanvas().toDataURL() ||
											''
									)
								}
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
							<div className={styles.edit__buttons}>
								<Button
									ref={previewRef}
									onClick={handlePreview}
									variant='outlined'
									size='small'
								>
									Show Preview
								</Button>
								<Button
									onClick={() => fileRef.current?.click()}
									variant='contained'
									size='small'
								>
									Load another image
								</Button>
							</div>
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
						Load Avatar
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
							Save Avatar
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
