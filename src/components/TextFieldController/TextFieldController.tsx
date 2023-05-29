import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Props } from './types';

const TextFieldController = <T extends unknown>({
  form,
  label,
  type,
  onChange,
  name,
  fullWidth = true
}: Props<T>) => {
  return (
    <Controller
      control={form.control as Control}
      render={({ field }) => (
        <TextField
          fullWidth={fullWidth}
          label={label || ''}
          type={type || 'text'}
          onChange={onChange || field.onChange}
        />
      )}
      name={name}
    />
  );
};

export default TextFieldController;