// Original Code from https://mui.com/material-ui/react-tabs/
// Changes made by Vincent Marshall
//
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Welcome } from '~/welcome/welcome';
import { Search } from './tabhot';
import { Favs } from './tabfav';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function CustomTabLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Hot List" {...a11yProps(0)} />
          <Tab label="Favorites" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Search/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Favs/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <p>React Frontend Assignment </p>
        <p>SENG3080-25W-Sec2 Advanced Web Frameworks</p>
        <p>Made by Vincent Marshall (87120006)</p>
      </CustomTabPanel>
    </Box>
  );
}

//isMember ? "$2.00" : "$10.00"
