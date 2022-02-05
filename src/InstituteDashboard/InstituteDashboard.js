import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import { Avatar } from "@material-ui/core";


// drawer imports
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ClassIcon from '@mui/icons-material/Class';

//files
import Dash_Users from "./Dashcontent/Dash_Users";
import Drawer_Account from "./Dashcontent/Drawer_accout";
import InsDashboard from "./Dashcontent/InsDashboard";
import BasicModal from "./Dashcontent/Dash_modalbox";
import DashCourses from "./Dashcontent/Dash_Courses";
import DashWallet from "./Dashcontent/Dash_Wallet";
//tabs
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// default function
export default function VerticalTabs() {
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
      <Drawer_Account/>
      </Box>
    </>
  );

  // tabs

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawerWidth = 240;



  const[profileData1,setprofileData1] = useState([])

  const token = localStorage.getItem("token");

  //get api for stuident profile 

  useEffect(() => {
    axios
    .get("https://app.5am5pm.com:3000/institute_admin/institute_profile",
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          elevation={0}
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar style={{backgroundColor:'#003db3',color:'#fff'}}>
            <Grid container>
              <Grid item md={11} sm={11} xs={11}>
              
              </Grid>
              <Grid item md={1} sm={1} xs={1}>
                <div style={{ textAlign: "right" }}>
                  {/* drawer code */}
                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                          {
                          profileData1.map((data) => ( <img src={data.profile_dp} width= '40px' height= '40px' 
                            style={{cursor:'pointer',borderRadius:'50%'}} 
                            onClick={toggleDrawer(anchor, true)} 
                              />  ))
                           
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
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            {/* tabs */}
          <div style={{width:'100%',height:'36px'}}></div>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab style={{alignItems:'baseline'}}
                label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <DashboardIcon className="iconsandTextStyle" /> &nbsp;DashBoard
</Typography>
              
              </div>}
                {...a11yProps(0)}
              />

<Tab style={{alignItems:'baseline'}}
                label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <ClassIcon className="iconsandTextStyle" /> &nbsp;COURSES
</Typography>
              
              </div>}
                {...a11yProps(1)}
              />


              <Tab style={{alignItems:'baseline'}}
                label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <GroupIcon className="iconsandTextStyle" /> &nbsp;USERS
</Typography>
              
              </div>}
                {...a11yProps(2)}
              />
              <Tab style={{alignItems:'baseline'}}
                label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <SubscriptionsIcon className="iconsandTextStyle" /> &nbsp;SUBSCRIPTIONS
</Typography>
              
              </div>}
                {...a11yProps(3)}
              />
              <Tab style={{alignItems:'baseline'}}
                label={<div> 
                  
                  <Typography variant="subtitle1" className="iconsandTextStyle">
    <AccountBalanceWalletIcon className="iconsandTextStyle" /> &nbsp;WALLET
</Typography>
              
              </div>}
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <TabPanel value={value} index={0}>
            <InsDashboard/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DashCourses />
          </TabPanel>
          <TabPanel value={value} index={2}>
            
            <Dash_Users />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Subscriptions
          </TabPanel>
          <TabPanel value={value} index={4}>
            <DashWallet/>
          </TabPanel>
        </Box>
      </Box>


{/* modal box code used by recoil */}

<BasicModal/>
    </>
  );
}
