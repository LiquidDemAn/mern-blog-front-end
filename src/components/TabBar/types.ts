import { ReactNode } from 'react';

export type TabType = {
  value: string;
  label: ReactNode | string;
  tabContent: ReactNode;
};

export type Props = {
  tabs: TabType[];
};
