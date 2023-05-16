import { useForm, useWatch } from 'react-hook-form';
import React from 'react';
import { FindUsersEnum, SearchingUsersRequest } from 'api/models/UserType';

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export const defaultValues: SearchingUsersRequest = {
  searchType: FindUsersEnum.FullName,
  value: ''
};
export const useSearchUsersForm = (
  setFilters: Setter<SearchingUsersRequest>
) => {
  const form = useForm({ defaultValues });

  const searchType = useWatch({ control: form.control, name: 'searchType' });

  const onSubmit = () => {
    setFilters(form.getValues());
  };

  return {
    form,
    searchType,
    onSubmit: form.handleSubmit(onSubmit)
  };
};
