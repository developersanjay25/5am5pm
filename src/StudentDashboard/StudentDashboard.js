import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from '@mui/material';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';


//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ReplayIcon from '@mui/icons-material/Replay';

//files
import Student_Drawer_Account from './StudentAccount';
import HelloTest from '../test';

//tabs import
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//tabpanel import
import MyCourses from './MyCourses';


//styles
import './studentdashbordstyles.css';

const drawerWidth = 240;

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


const StudentDashboard = () => {



 //right-sidedrawer
 const [state, setState] = React.useState({
  right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
  setState({ [anchor]: open });
};

const list = (anchor) => (
  <>
    <Box sx={{ width: 375 }} onClick={toggleDrawer(anchor, false)}>
    <Toolbar></Toolbar>
   <Student_Drawer_Account/>
    </Box>
  </>
);








  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  const[profileData1,setprofileData1] = useState([])

  const token = localStorage.getItem("token");

  //get api for stuident profile 

  useEffect(() => {
    axios
    .get("https://app.5am5pm.com:3000/student/student_profile",
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








    return(
        <React.Fragment>
            
            <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
       
        <Toolbar style={{backgroundColor:'#003db3',color:'#fff'}}>
            <Grid container>
              <Grid item md={11} sm={11} xs={11}>
                <div className='dashboardTitle'>
              {profileData1.map((data) => (  <Typography variant="p">WELCOME &nbsp;{data.first_name.toUpperCase()}</Typography>))}
                </div>
              
              </Grid>
              <Grid item md={1} sm={1} xs={1}>
                <div className='DashboardProfileicon'>
                  {/* drawer code */}
                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        {
                          profileData1.map((data) => ( <Avatar sx={{ width: 40, height: 40 }}
                            style={{cursor:'pointer'}} 
                            onClick={toggleDrawer(anchor, true)} 
                             src={data.profile_dp} />  ))
                           
                        }



                    

                       
                        <Drawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                        {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                  {/* end of drawer code */}
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
        
        <Box sx={{ overflow: 'auto' }}>
         <Toolbar/>
          {/* tabs menu goes here */}
          <Tabs
        orientation="vertical"
        style={{display:'flex',alignItems:'baseline',padding:0,fontSize:'24px'}}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
         <Tab style={{alignItems:'baseline'}} label= {<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <DashboardIcon className="iconsandTextStyle" /> &nbsp;DashBoard
</Typography>
              
              </div>} {...a11yProps(0)} />
        <Tab style={{alignItems:'baseline'}} label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <LocalLibraryIcon className="iconsandTextStyle" /> &nbsp;My Courses
</Typography>
              
              </div>} {...a11yProps(1)} />
        <Tab style={{alignItems:'baseline'}} label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <CreditScoreIcon className="iconsandTextStyle" /> &nbsp;Billing & History
</Typography>
              
              </div>} {...a11yProps(2)} />


              <Tab style={{alignItems:'baseline'}} label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <ReplayIcon className="iconsandTextStyle" /> &nbsp;Replay Videos
</Typography>
              
              </div>} {...a11yProps(3)} />
       
      </Tabs>
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{width:'100%',height:'64px'}}></Box>
        <TabPanel value={value} index={0}>
        <MyCourses/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        My WishList
      </TabPanel>
      <TabPanel value={value} index={2}>
       Archived
      </TabPanel>
      <TabPanel value={value} index={3}>
       <HelloTest/>
      </TabPanel>
      </Box>
    </Box>


        </React.Fragment>
    );
}

export default StudentDashboard;