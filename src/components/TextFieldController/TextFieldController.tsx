import { Control, Controller, get } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Props } from './types';

const TextFieldController = <T extends unknown>({
  form,
  onChange,
  name,
  helperText,
  fullWidth,
  ...other
}: Props<T>) => {
  const errors = form.formState.errors;
  const errorMessage = get(errors, name)?.message;
  const isError = !!errorMessage;

  return (
    <Controller
      control={form.control as Control}
      render={({ field }) => (
        <TextField
          onChange={onChange || field.onChange}
          helperText={errorMessage || helperText}
          error={isError}
          fullWidth={fullWidth || true}
          {...other}
        />
      )}
      name={name}
    />
  );
};

export default TextFieldController;
