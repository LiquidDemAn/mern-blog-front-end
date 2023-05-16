import { ReactElement } from 'react';

type Props = {
  children?: ReactElement | ReactElement[];
  index: string;
  value: string;
};

export const TabPanel = ({ children, index, value }: Props) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && children}
    </div>
  );
};
