import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children: ReactNode | string | Element;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
