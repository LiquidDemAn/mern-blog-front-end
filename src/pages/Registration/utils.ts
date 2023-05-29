export type registerFieldItem = {
  name: string;
  label?: string;
  type?: string;
  helperText?: string;
};

export const registerFieldItems: registerFieldItem[] = [
  {
    label: 'Full Name',
    name: 'fullName',
    helperText:
      'Full name must be at least 3 characters long and not contain special characters!'
  },
  {
    label: 'Nick Name',
    name: 'nickName',
    helperText:
      'Nick name must be at least 3 characters long, not contain spaces and special characters!'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    helperText: 'Password must be at least 5 characters long!'
  }
];
