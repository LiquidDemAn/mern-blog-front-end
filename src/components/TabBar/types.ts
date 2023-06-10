import { SyntheticEvent } from 'react';
import { TabsEnum, TabType } from 'typedef';

export type Props = {
  currentTab: TabsEnum;
  tabs: TabType[];
  handleChange?: (event: SyntheticEvent, newTab: TabsEnum) => void;
};
