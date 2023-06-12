import { ChangeEvent, ReactElement, useState } from 'react';
import PaperWrapper from '../../../../components/PaperWrapper';
import { PostCommentType } from 'redux/services/posts/typedef';
import { List, TextField } from '@mui/material';
import { Comment } from '../comment';
import { EditDialog } from 'components/dialogs/edit';
import { useSelf } from 'hooks/useSelf';
import ConfirmationDialog from 'components/ConfirmationDialog';

type Props = {
  comments?: PostCommentType[];
  isLoading?: boolean;
  children?: ReactElement | ReactElement[];
  onEditComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => Promise<void>;
  onlikeComment: (commentId: string) => Promise<void>;
  onUnLikeComment: (commentId: string) => Promise<void>;
};

export const Comments = ({
  comments = [],
  children,
  isLoading,
  onEditComment,
  onDeleteComment,
  onlikeComment,
  onUnLikeComment
}: Props) => {
  const [comment, setComment] = useState({
    id: '',
    text: ''
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { selfId } = useSelf();

  const handleDeleteOpen = (id: string) => {
    setComment({
      id,
      text: ''
    });
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setComment({
      id: '',
      text: ''
    });
    setOpenDelete(false);
  };

  const handleEditOpen = (id: string, text: string) => {
    setComment({
      id,
      text
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setComment({
      id: '',
      text: ''
    });
    setOpenEdit(false);
  };

  const onDeleteSubmit = () => {
    handleDeleteClose();
    onDeleteComment(comment.id);
  };

  const onEditCommentText = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment({
      ...comment,
      text: event.target.value
    });
  };

  const onEditSubmit = () => {
    if (comment.text) {
      handleEditClose();
      onEditComment(comment.id, comment.text);
    }
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <PaperWrapper title="Comments">
        <List>
          {comments.map((item) => (
            <Comment
              key={item._id}
              comment={item}
              handleEditOpen={handleEditOpen}
              handleDeleteOpen={handleDeleteOpen}
              onlikeComment={onlikeComment}
              onUnLikeComment={onUnLikeComment}
            />
          ))}
        </List>
        {children && selfId ? <>{children}</> : <></>}
      </PaperWrapper>

      {/* Dialogs */}
      <EditDialog
        title="Editing a comment!"
        open={openEdit}
        handleClose={handleEditClose}
        onEdit={onEditSubmit}
      >
        <TextField
          onChange={onEditCommentText}
          value={comment.text}
          label="Write a comment"
          variant="standard"
          multiline
          fullWidth
        />
      </EditDialog>

      <ConfirmationDialog
        title="Deleting a comment!"
        text="Do you really want to delete this comment?"
        open={openDelete}
        handleClose={handleDeleteClose}
        onSubmit={onDeleteSubmit}
      />
    </>
  );
};
