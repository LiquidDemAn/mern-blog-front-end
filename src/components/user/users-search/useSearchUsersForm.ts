import { useForm } from 'react-hook-form';
import React from 'react';
import { defaultValues } from './utils';
import { SearchingUsersRequest } from 'api/models/UserType';

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export const useSearchUsersForm = (
  setFilters: Setter<SearchingUsersRequest>
) => {
  const form = useForm({ defaultValues });

  const onSubmit = () => {
    console.log(form.getValues());
    setFilters(form.getValues());
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
