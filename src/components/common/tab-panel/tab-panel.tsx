import { ReactElement } from 'react';
import { TabsEnum } from '../../../typedef';

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
