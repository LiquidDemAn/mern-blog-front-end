import { TabsEnum } from '../../../typedef';
import { SyntheticEvent } from 'react';

export type Props = {
  value: TabsEnum;
  handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
};
