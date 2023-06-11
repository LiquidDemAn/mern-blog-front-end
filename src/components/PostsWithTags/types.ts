import { TabsEnum, TabType } from '../../typedef';
import { SyntheticEvent } from 'react';

export type Props = {
  currentTab: TabsEnum;
  tabs: TabType[];
  handleChangeTab: (event: SyntheticEvent, newValue: TabsEnum) => void;
  tags?: string[];
  showTags?: boolean;
  isTagsLoading?: boolean;
};
