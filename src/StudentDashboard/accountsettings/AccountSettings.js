import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container,Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


//snackbar code
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';



//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

//files
import Student_Drawer_Account from '../StudentAccount';

//tabs import
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


//styles
import '../studentdashbordstyles.css';
import './accountSettings.css';
import axios from 'axios';

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




const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AccountSettings = () => {



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

  const back2Dasboard = () => {
      window.location.href="/app/studentdashboard";
  }




      //hooks for snackbar
      
      const [snackopen, setsnackOpen] = React.useState(false);

      const snackhandler = () => {
        setsnackOpen(true);
      };
    
      const snackclose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setsnackOpen(false);
      };

      
      const [snackopen1, setsnackOpen1] = React.useState(false);

      const snackhandler1 = () => {
        setsnackOpen1(true);
      };
    
      const snackclose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setsnackOpen1(false);
      };


      
      

      



        //hooks for profile settings fields
        const[pfirstName,setpfirstname] = useState("");
        const[plastname,setplastname] = useState("");
        const[paddress,setpaddress] = useState("");
        const[pcity,setpcity] = useState("");
        const[pstate,setpstate] = useState("");
        const[pzip,setpzip] = useState("");
        const[pcountry,setpcountry] = useState("");
        const[pemail,setpemail] = useState("");
        const[planguage,setplanguage] = useState("");
        const[pdegree,setpdegree] = useState("");
        const[pworkexp,setpworkexp] = useState("");
        const[pbio,setpbio] = useState("");
        const[pabout,setpabout] = useState("");
        const[profilepic,setprofilepic] = useState()

        
      

        const profilephoto = (e) => {
          setprofilepic(e.target.files[0])
        }

        const firstNameHandler = (e) => {
          setpfirstname(e.target.value);
        }

        const lastNameHandler = (e) => {
          setplastname(e.target.value)
        }

        const emailhandler = (e) => {
          setpemail(e.target.value)
        }

        const addressHandler = (e) => {
          setpaddress(e.target.value)
        }

        const cityHandler = (e) => {
          setpcity(e.target.value)
        }

        const stateHandler = (e) => {
          setpstate(e.target.value)
        }

        const ziphandler = (e) => {
          setpzip(e.target.value)
        }
        const countryHandler = (e) => {
          setpcountry(e.target.value)
        }



                    //student profile upload api call

                    const token = localStorage.getItem("token")

                    var myAccountData = new FormData();

                    
                    myAccountData.append('first_name',pfirstName);
                    myAccountData.append('last_name',plastname);
                    myAccountData.append('address',paddress);
                    myAccountData.append('city',pcity);
                    myAccountData.append('state',pstate);
                    myAccountData.append('zip',pzip);
                    myAccountData.append('country',pcountry);
                    myAccountData.append('email',pemail);
                    myAccountData.append('profile_dp',profilepic);


               
                 const[abc,setabc] = useState(true) 
      

        const saveChanges = (e) => {
          axios
          .patch("https://app.5am5pm.com:3000/student/update_profile",myAccountData, { headers:{ Authorization: `Bearer ${token}`} })
          .then((res) => {
            console.log(res.data)
            if(res.data.status == "success"){
              setabc(!abc);
              setsnackOpen(true)
            }else{
              setsnackOpen1(true)
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }



        const [profileGet,setProfileGet] = useState([]);
       
        //staff profile getting api
        useEffect(() => {
          const url = "https://app.5am5pm.com:3000/student/student_profile";
         axios
         .get(url,  { headers:{ Authorization: `Bearer ${token}`} })
         .then((res) => {
           setProfileGet(res.data.data);
         })
         .catch((err) => {
           console.log(err)
         }) 
        },[abc])
    













    return(
        <React.Fragment>
            
            <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
       
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
                          profileGet.map((data) => {
                            return(
                              <img src={data.profile_dp} width="40px" height="40px" 
                              style={{borderRadius:'50%'}}
                              onClick={toggleDrawer(anchor, true)}
                            ></img>
                            )})
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
     
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
                        
  
        
        <Grid container>
            <Grid item md={12} sm={12} xs={12}>
                <div style={{textAlign:'right'}}>
                    <CloseIcon className="clsiconstyle" onClick={back2Dasboard}/>
                </div>
            </Grid>
        </Grid>


        {
          profileGet.map((data) => {
            return(





              <Container>
              <Paper>
                  <div style={{padding:'24px'}}>
              <Grid container>
                  <Grid item md={12} sm={12} xs={12}>
                      <div style={{textAlign:'center'}}>
                          <Typography variant="h6">UPDATE YOUR PROFILE</Typography>
                      </div>
                  </Grid>
              </Grid>
      
              <div className="heightStyle2"></div>
            
             
             
              <Grid container spacing={4}>
                  <Grid item md={12} sm={12} xs={12}>
                      <div className="ASimagecontainer">
                      <img src={data.profile_dp} width="150px" height="150px" style={{borderRadius:'50%'}}></img>
                      <div className="heightStyle2"></div>
                      <Typography variant="p">{data.first_name.toUpperCase()}</Typography>
                     
                      <div className="heightStyle2"></div>
                      <TextField variant="outlined"  type="file" onChange={(e) => profilephoto (e)}></TextField>
      
                      </div>
                  </Grid>
              </Grid>
      
              {/* 2nd row */}
              <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                           <p className="profilelableStyle">First Name</p>
                  <TextField variant="outlined" defaultValue={data.first_name} onChange={(e) => firstNameHandler (e)}  fullWidth  id="first_name" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Last Name</p>
                  <TextField variant="outlined" defaultValue={data.last_name} onChange={(e) => lastNameHandler (e)} fullWidth  id="last_name" />
                      </Box>
                  </Grid>
              </Grid>
      
      
                          {/* 3rd row */}
      
                           
                          <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                           <p className="profilelableStyle">Date</p>
                  <TextField variant="outlined" defaultValue={data.dob} type="date" fullWidth  id="fullWidth" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Email</p>
                  <TextField variant="outlined" defaultValue={data.email} onChange={(e) => emailhandler (e)}  fullWidth  id="email" />
                      </Box>
                  </Grid>
              </Grid>
      
      
              {/* 4th row */}
      
      
              <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Mobile No</p>
                  <TextField variant="outlined" defaultValue={data.mobile} disabled fullWidth  id="fullWidth" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                
                  </Grid>
              </Grid>
      
              {/* 5th row */}
              <Grid container spacing={4}>
                  <Grid item md={12} sm={12} xs={12}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Address</p>
                  <TextField variant="outlined" defaultValue={data.address} onChange={(e) => addressHandler (e)} fullWidth  id="address" />
                      </Box>
                  </Grid>
             
              </Grid>
      
                          {/* 6th row */}
      
                          <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">City</p>
                  <TextField variant="outlined" defaultValue={data.city} onChange={(e) => cityHandler (e)} fullWidth  id="city" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">State</p>
                  <TextField variant="outlined" defaultValue={data.state} onChange={(e) => stateHandler (e)} fullWidth  id="state" />
                      </Box>
                  </Grid>
              </Grid>
      
              {/* 7th row */}
      
              <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Zip Code</p>
                  <TextField variant="outlined" defaultValue={data.zip} onChange={(e) => ziphandler (e)} fullWidth  id="zip" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Country</p>
                  <TextField variant="outlined" defaultValue={data.country} onChange={(e) => countryHandler (e)} fullWidth  id="country" />
                      </Box>
                  </Grid>
              </Grid>
      
                          {/* last button */}
                          <div className='heightStyle1'></div>
                          <Grid container spacing={4}>
                          <Grid item md={12} sm={12} xs={12}>
                              <div style={{textAlign:'center'}}>
                                  <Button
                                  variant="contianed"
                                  style={{backgroundColor:'#002db3',color:'#fff',borderRadius:0}}
                                  onClick={(e) => saveChanges(e)}
                                  >Save Changes</Button>
                              </div>
                          </Grid>
              </Grid>
              </div>
              </Paper>  
              </Container>  
                 













            );
          })
        }

     



      </Box>
    </Box>





                  {/* snackcode */}

                  <div>
      
      <Snackbar
        open={snackopen}
        autoHideDuration={6000}
        onClose={snackclose}
        message="Note archived"
        anchorOrigin={{vertical:"top", horizontal:"center"}}   
      >
       <Alert severity="success" sx={{ width: '100%' }}>
      "Profie Details Successfully Updated"
       </Alert>
  
       </Snackbar>

       <Snackbar
        open={snackopen1}
        autoHideDuration={6000}
        onClose={snackclose1}
        message="Note archived"
        anchorOrigin={{vertical:"top", horizontal:"center"}}         
      >
     
       <Alert severity="success" sx={{ width: '100%' }}>
      "Profie Details not Updated Try Again Later"
       </Alert>
       </Snackbar>
    </div>

        </React.Fragment>
    );
}

export default AccountSettings;