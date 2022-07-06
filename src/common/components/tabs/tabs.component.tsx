import React, { ReactNode, SyntheticEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { TabPanel } from './tab-panel.component';

import './tabs.component.scss';

interface A11yProps {
  id: string;
  'aria-controls': string;
}

export interface TabInfo {
  label: string;
  content: string | ReactNode | Element;
}

const a11yProps = (index: number): A11yProps => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

interface TabsProps {
  'data-testid'?: string;
  header?: ReactNode;
  onChange: (label: string) => void;
  options: TabInfo[];
}

export const TabsComponent: React.FC<TabsProps> = (props) => {
  const { 'data-testid': dataTestId, header, options, onChange } = props;
  const [value, setValue] = React.useState(0);

  const isTablet = window.matchMedia('(max-width: 768px)').matches;

  const handleChange = (
    e: SyntheticEvent<Element, Event>,
    newValue: number
  ): void => {
    const targetElement = e.currentTarget as HTMLElement;
    const labelSelected = targetElement.textContent?.toUpperCase();
    setValue(newValue);
    onChange && onChange(labelSelected);
  };

  return (
    <Box
      className="TabsComponent"
      sx={{ width: '100%' }}
      data-testid={dataTestId}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          className="tabs__container"
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant={isTablet ? 'fullWidth' : 'standard'}
        >
          {options?.length > 0 &&
            options.map((option, index) => (
              <Tab
                className="tab-label"
                key={index}
                label={option.label}
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
      </Box>
      {header && header}
      {options?.length > 0 &&
        options.map((option, index) => (
          <TabPanel key={index} value={value} index={index}>
            {option.content}
          </TabPanel>
        ))}
    </Box>
  );
};
