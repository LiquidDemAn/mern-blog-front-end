import { UseFormReturn } from 'react-hook-form';

export type Props<T> = {
  form: UseFormReturn<T, object>;
  name: string;
  label?: string;
  type?: string;
  onChange?: any;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
};
