import styles from './create-post.module.scss';
import 'easymde/dist/easymde.min.css';
import { ChangeEvent, useMemo, useRef } from 'react';
import {
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import { Link } from 'react-router-dom';
import { CreatePostType, CreatPostValidErrorType } from '../create-post';
import { BreakpointsEnum, ErrorType, PathsEnum } from 'typedef';

type Props = {
  post: CreatePostType;
  link: string;
  isEditing: boolean;
  open: boolean;
  error: null | ErrorType;
  validError: null | CreatPostValidErrorType[];
  handleChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onTags: (event: ChangeEvent<HTMLInputElement>) => void;
  onTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onText: (text: string) => void;
  onSubmit: () => Promise<void>;
  onRemoveImage: () => void;
  handleClose: () => void;
};

export const CreatePostView = ({
  post,
  link,
  isEditing,
  open,
  error,
  validError,
  handleChangeFile,
  onRemoveImage,
  onTitle,
  onText,
  onTags,
  onSubmit,
  handleClose
}: Props) => {
  const fileRef = useRef<null | HTMLInputElement>(null);
  const isSmall = window.innerWidth <= BreakpointsEnum.Small;

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
        delay: 1000
      }
    }),
    []
  );

  return (
    <>
      <Paper style={{ padding: 30 }}>
        <div className={styles.preview_buttons}>
          <Button
            onClick={() => fileRef.current?.click()}
            variant="outlined"
            size={isSmall ? 'small' : 'large'}
          >
            Download preview
          </Button>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={fileRef}
            onChange={handleChangeFile}
            hidden
          />
          {(link || post.imageUrl) && (
            <Button
              variant="contained"
              size={isSmall ? 'small' : 'large'}
              color="error"
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
                src={
                  link
                    ? link
                    : `${process.env.REACT_APP_API_URL || PathsEnum.Server}${
                        post.imageUrl
                      }`
                }
                alt="Uploaded"
              />
            ) : (
              <img className={styles.image} src={link} alt="Uploaded" />
            )}
          </>
        )}

        <TextField
          onChange={onTitle}
          value={post.title}
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Article title..."
          fullWidth
        />
        <TextField
          onChange={onTags}
          value={post.tags}
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={post.text}
          onChange={onText}
          options={options}
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEditing ? 'Save' : 'Publish'}
          </Button>
          <Link to="/">
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="create-post-error-title"
        aria-describedby="create-post-error-description"
      >
        <DialogTitle id="create-post-error-title">
          {isEditing ? 'Edit' : 'Create'} post ERROR
        </DialogTitle>

        <DialogContent>
          <>
            {error?.status === 404 && (
              <DialogContentText id="create-post-error-description">
                Post Not Found! Please, check id of the post.
              </DialogContentText>
            )}

            {error?.status === 500 && (
              <DialogContentText id="create-post-error-description">
                Something went wrong! Try again later...
              </DialogContentText>
            )}

            {validError?.length &&
              validError.map((item) => {
                return (
                  <DialogContentText
                    key={item.param}
                    id="create-post-error-description"
                  >
                    {item.param === 'text' &&
                      'Text: text must be more than 3 characters long'}
                    {item.param === 'title' &&
                      'Title: title must be more than 3 characters long'}
                    {item.param === 'tags' && 'Tags: Tags entered incorrectly'}
                  </DialogContentText>
                );
              })}
          </>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
