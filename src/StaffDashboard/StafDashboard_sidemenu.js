import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Paper } from '@mui/material';
import { useEffect } from 'react';

//account settings
import Drawer_Account_staff from './AccountSettings';

//import recoil
import {Rdrawer} from './StafRecoil';
import { useRecoilState } from 'recoil';

export default function TemporaryDrawer() {
  const [odrawer, setOdrawer] = useRecoilState(Rdrawer)
  
  function handleclose(){
    setOdrawer(false);
  }

  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
    >
    </Box>
  );
  
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor="right"
            open={odrawer}
            onClose={handleclose}
          >
            {list(anchor)}
            <div style={{width:'100%',height:'64px'}}></div>
            <Drawer_Account_staff/>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}