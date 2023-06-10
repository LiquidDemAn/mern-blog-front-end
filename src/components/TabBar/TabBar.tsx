import React, { FC, PropsWithChildren } from 'react';
import { Tab, Tabs } from '@mui/material';
import { Props } from './types';
import { TabPanel } from 'components/common/tab-panel';

const TabBar: FC<PropsWithChildren<Props>> = ({
  tabs,
  currentTab,
  handleChange
}) => {
  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="scrollable"
        visibleScrollbar
      >
        {tabs.map(({ value, label }) => (
          <Tab value={value} label={label} />
        ))}
      </Tabs>

      {tabs.map((tab) => {
        return (
          <TabPanel value={currentTab} index={tab.value}>
            <>{tab.tabContent}</>
          </TabPanel>
        );
      })}
    </>
  );
};

export default TabBar;
