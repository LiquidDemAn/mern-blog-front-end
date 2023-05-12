import styles from './users-search.module.scss';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useRef } from 'react';
import { FindUsersEnum, SearchingUsersRequest } from 'api/models/UserType';
import { Controller, UseFormReturn } from 'react-hook-form';

type Props = {
  onSubmit: (values: any) => void;
  form: UseFormReturn<SearchingUsersRequest>;
  searchType: FindUsersEnum;
};

export const UsersSearch = ({ searchType, onSubmit, form }: Props) => {
  const findRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className={styles.select}>
        <label>Search by:</label>
      </div>

      <form onSubmit={onSubmit} className={styles.search}>
        <Controller
          control={form.control}
          render={({ field }) => (
            <Select
              displayEmpty
              name="searchType"
              value={field.value}
              onChange={field.onChange}
              id="find-users-select"
              size="small"
            >
              <MenuItem value={FindUsersEnum.NickName}>
                {FindUsersEnum.NickName}
              </MenuItem>
              <MenuItem value={FindUsersEnum.FullName}>
                {FindUsersEnum.FullName}
              </MenuItem>
            </Select>
          )}
          name="searchType"
        />

        <Controller
          control={form.control}
          render={({ field }) => (
            <TextField
              inputRef={findRef}
              name="value"
              id="find-person"
              onChange={field.onChange}
              label={
                searchType === FindUsersEnum.NickName
                  ? 'Enter nickname'
                  : 'Enter fullname'
              }
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
          name="value"
        />

        <Button type="submit" variant="contained">
          Find
        </Button>
      </form>
    </>
  );
};
