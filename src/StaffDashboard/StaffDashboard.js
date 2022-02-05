import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import sitelogo from '../Logo/1.png';

//drawer imports
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

//material icons
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import VideoCallIcon from '@mui/icons-material/VideoCall';

//import recoil
import {Rdrawer} from './StafRecoil';
import { useRecoilState } from 'recoil';

//files import
import TemporaryDrawer from './StafDashboard_sidemenu';
import Dash_Create_Course from './Dash_Create_Course';
import Meetings from './Meeting';

//css file
import './StafDashboard.css';


const drawerWidth = 240;

//tabpanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}





export default function VerticalTabs() {

  const [ODrawer,setOdrawer] = useRecoilState(Rdrawer);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //sidemenu function

  const Staff_SideMenu = () => {
    setOdrawer(!ODrawer)
  }



  const[profileData1,setprofileData1] = useState([])

  const token = localStorage.getItem("token");

  //get api for stuident profile 

  useEffect(() => {
    axios
    .get("https://app.5am5pm.com:3000/staf/staf_profile",
    { headers:{ Authorization: `Bearer ${token}`} }
    )
    .then((res) => {
      console.log(res.data.data)
      setprofileData1(res.data.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[])


  const staffAppbarimage = () => {
    window.location.href="/"
  }


  return (
    <>
    {/* drawer rendered code */}

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar style={{backgroundColor:'#003db3'}}>
            <Grid container>
                <Grid item md={1}>
                
                   <img style={{cursor:'pointer'}} onClick={staffAppbarimage} src={sitelogo} width="100%" height="auto"></img>
                </Grid>
                <Grid item md={10}>
                
               
             </Grid>
                <Grid item md={1}>
                    <div style={{paddingLeft:'70%'}}>
                    {
                          profileData1.map((data) => ( <Avatar sx={{ width: 40, height: 40 }}
                            style={{cursor:'pointer'}} 
                            onClick={Staff_SideMenu}
                             src={data.profile_dp} />  ))
                           
                        }
                  
                    <TemporaryDrawer/>
                    </div>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        style={{display:'flex',alignItems:'baseline',padding:0,fontSize:'24px'}}
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab style={{alignItems:'baseline'}} label= {<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <CreateIcon className="iconsandTextStyle" /> &nbsp;CREATE COURSE
</Typography>
              
              </div>} {...a11yProps(0)} />
        <Tab style={{alignItems:'baseline'}} label= {<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <VideoCallIcon className="iconsandTextStyle" /> &nbsp;MEETINGS
</Typography>
              
              </div>}{...a11yProps(1)} />
        <Tab label="" {...a11yProps(2)} />
     
      </Tabs>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box style={{width:'100%',height:'64px'}}></Box>
        
        <TabPanel value={value} index={0}>
        <Dash_Create_Course/>
       </TabPanel>
       <TabPanel value={value} index={1}>
         <Meetings/>
       </TabPanel>
       <TabPanel value={value} index={2}>
        
      </TabPanel>
        
        
      </Box>
    </Box>
    </>


  );
}