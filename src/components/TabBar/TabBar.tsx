import React, {
  FC,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useState
} from 'react';
import { Tab, Tabs } from '@mui/material';
import { Props } from './types';
import { TabPanel } from 'components/common/tab-panel';
import { TabsEnum } from 'typedef';
import { useParams } from 'react-router-dom';

const TabBar: FC<PropsWithChildren<Props>> = ({ tabs, defaultTab }) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const { nickName } = useParams();

  const handleChange = (event: SyntheticEvent, newTab: TabsEnum) => {
    setCurrentTab(newTab);
  };

  useEffect(() => {
    setCurrentTab(TabsEnum.Posts);
  }, [nickName]);

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
