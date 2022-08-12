import { ReactElement } from 'react';
import { TabsEnum } from '../../pages/home/home';

type Props = {
	children?: ReactElement | ReactElement[];
	index: TabsEnum;
	value: TabsEnum;
};

export const TabPanel = ({ children, index, value }: Props) => {
	return (
		<div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`}>
			{value === index && children}
		</div>
	);
};
