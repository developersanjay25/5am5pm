import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container,Paper } from '@mui/material';

import { Grid } from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

//snackbar code
import Snackbar from '@mui/material/Snackbar';




//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

//files
import Drawer_Account_staff from '../AccountSettings';

//tabs import
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


//styles

import './accountSettings.css';

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


const StaffAccountSettings = () => {



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
   <Drawer_Account_staff/>
    </Box>
  </>
);



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




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
 
    




  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const back2Dasboard = () => {
      window.location.href="/app/staffdashboard";
  }

 
  const  StaffCancel = () => {
    window.location.href="/app/staffdashboard";
    }



    //staff profile updation hooks
    const[StaffFirstName,setStaffFirstName] = useState("");
    const[StaffLastName,setStaffLastName] = useState("");
    const[stafflocation,setstafflocation] = useState("");
    const[staffLanguage,setstaffLanguage] = useState("");
    const[staffdegree,setstaffdegree] = useState("");
    const[staffworkexperience,setstaffworkexperience] = useState("");
    const[staffbio,setstaffbio] = useState("");
    const[stafflinkedinid,setstafflinkedinid] = useState("");
    const[staffprofile_dp,setstaffprofile_dp] = useState("");
    const[staffmobile,setstaffmobile] = useState("");
    const[staffemail,setstaffemail] = useState("");

    const firstNameHandler = (e) => {
      setStaffFirstName(e.target.value);
    } 

    const lastNameHandler = (e) => {
      setStaffLastName(e.target.value);
      console.log(StaffLastName);
    }

    const locationHandler = (e) => {
      setstafflocation(e.target.value);
    }

    const LanguageHandler = (e) => {
      setstaffLanguage(e.target.value);
    }

    const DegreeHandler = (e) => {
      setstaffdegree(e.target.value);
    }

    const workHandler = (e) => {
      setstaffworkexperience(e.target.value);
    } 

    const bioHander = (e) => {
      setstaffbio(e.target.value);
    }

    const linkedinHandler = (e) => {
      setstafflinkedinid(e.target.value);
    }

    const profiledpHandler = (e) => {
      setstaffprofile_dp(e.target.files[0]);
    }

    const mobileHandler = (e) => {
      setstaffmobile(e.target.value);
    }

    const EmailHandeler = (e) => {
      setstaffemail(e.target.value);
    }
   

    //staff profile updation api


    const token = localStorage.getItem("token")
    var myAccountData = new FormData();

    


    myAccountData.append('profile_dp',staffprofile_dp);
    myAccountData.append('first_name',StaffFirstName);
    myAccountData.append('last_name',StaffLastName);
    myAccountData.append('location',stafflocation);
    myAccountData.append('bio',staffbio);
    myAccountData.append('linkedin_id',stafflinkedinid);
    myAccountData.append('language_known',staffLanguage);
    myAccountData.append('mobile',staffmobile);
    myAccountData.append('email',staffemail);

    const[abc,setabc] = useState(true) 

    const saveChanges = (e) => {
      axios
      .patch("https://app.5am5pm.com:3000/staf/update_profile",myAccountData, { headers:{ Authorization: `Bearer ${token}`} })
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

    console.log(myAccountData);


    const [profileGet,setProfileGet] = useState([]);
       
    //staff profile getting api
    useEffect(() => {
      const url = "https://app.5am5pm.com:3000/staf/staf_profile";
     axios
     .get(url,  { headers:{ Authorization: `Bearer ${token}`} })
     .then((res) => {
       setProfileGet(res.data.data);
     })
     .catch((err) => {
       console.log(err)
     }) 
    },[
      abc
   ])







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
                      <img src={data.profile_dp} width="150px" height="150px" className="ASProfileimage"></img>
                      <div className="heightStyle2"></div>
                      <Typography variant="p">{data.first_name.toUpperCase()}</Typography>
                      <Typography className="profession">WEB DEVELOPER</Typography>
                      <div className="heightStyle2"></div>
                      <TextField variant="outlined" onChange={(e) => profiledpHandler (e)} type="file"></TextField>
      
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
                  <TextField variant="outlined" defaultValue={data.first_name} label="First Name" onChange={(e) => firstNameHandler (e)} fullWidth id="fullWidth" />
                      </Box>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Last Name</p>
                  <TextField variant="outlined" defaultValue={data.last_name} onChange={(e) => lastNameHandler (e)}  fullWidth label="Last Name" id="fullWidth" />
                      </Box>
                  </Grid>
              </Grid>
      
      
                          {/* 3rd row */}
      
                           
                          <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>


                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">About</p>
                  <TextField variant="outlined" defaultValue={data.about} onChange={(e) => bioHander (e)}  fullWidth label="bio" id="fullWidth" />
                      </Box>


                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Mobile No</p>
                  <TextField 
                  variant="outlined" 
                  defaultValue={data.mobile} 
                  onChange={(e) => mobileHandler (e)}  
                  fullWidth label="Mobile No" id="fullWidth" 
                  InputProps={{
                    readOnly: true,
                  }}
                  />
                      </Box>
                  </Grid>
              </Grid>
      
      
              {/* 4th row */}
      
      
              <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                


                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Email</p>
                  <TextField variant="outlined" defaultValue={data.email} onChange={(e) => EmailHandeler (e)}  fullWidth label="Email" id="fullWidth" />
                      </Box>

                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Linkedin Id</p>
                  <TextField variant="outlined" defaultValue={data.linkedin_id} onChange={(e) => linkedinHandler (e)}  fullWidth label="Linkedin Id" id="fullWidth" />
                      </Box>
                  </Grid>
              </Grid>
      
              {/* 5th row */}
              <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle"> Location </p>
                  <TextField variant="outlined" defaultValue={data.location} onChange={(e) => locationHandler (e)} fullWidth label="Location" id="fullWidth" />
                      </Box>
                  </Grid>


                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Language Known</p>
                  <TextField variant="outlined" defaultValue={data.language_known} onChange={(e) => LanguageHandler (e)}  fullWidth label="Language Known" id="fullWidth" />
                      </Box>
                  </Grid>
             
              </Grid>
      
                          {/* 6th row */}
      
                          <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={6}>
                   <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">degree</p>
                            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Degree</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={data.degree}
          value={staffdegree}
          label="Degree"
          onChange={DegreeHandler}
          style={{display:'flex',width:"100%",justifyContent:'center'}}
        >
          <MenuItem value='Diplamo'>Diplamo</MenuItem><br></br>
          <MenuItem value='UG'>UG</MenuItem><br></br>
          <MenuItem value='PG'>PG</MenuItem><br></br>
          <MenuItem value='Doctrate'>Doctrate</MenuItem>
        </Select>
      </FormControl>
                  
                      </Box> 
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                  <Box
                      sx={{
                       width: '100%', }}>
                            <p className="profilelableStyle">Work Experience</p>
                  <TextField variant="outlined" defaultValue={data.work_experience}  fullWidth label="Work Experience" onChange={(e) => workHandler (e)} id="fullWidth" />
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
                                  onClick={(e) => saveChanges (e)}
                                  >Save Changes</Button>
                                      &emsp;
                                  <Button
                                  variant="contianed"
                                  style={{backgroundColor:'#002db3',color:'#fff',borderRadius:0}}
                                  onClick={StaffCancel}
                                  >Cancel</Button>
                              </div>
                          </Grid>
              </Grid>
              </div>
              </Paper>  
              </Container>  





            )
          })
        }

    
           



      </Box>
    </Box>








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

export default StaffAccountSettings;