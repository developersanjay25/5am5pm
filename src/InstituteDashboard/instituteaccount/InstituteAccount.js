import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container,Paper } from '@mui/material';
import { Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';


//snackbar code
import Snackbar from '@mui/material/Snackbar';


//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

//files
import Drawer_Account from '../Dashcontent/Drawer_accout';

//tabs import
import PropTypes from 'prop-types';



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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstituteAccountSettings = () => {


  const [snackopen, setsnackOpen] = React.useState(false);
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


  const snackhandler = () => {
    setsnackOpen(true);
  };

  const snackclose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackOpen(false);
  };

  

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





  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const back2Dasboard = () => {
      window.location.href="/app/institutedashboard";
  }

 
  const  StaffCancel = () => {
    window.location.href="/app/institutedashboard";
    }


    //institute profile updation hooks
    const[instituteLogo,setinstituteLogo] = useState("");
    const[instituteImage,setinstituteImage] = useState("");
    const[insEmail,setinsEmail] = useState("");
    const[insMobile,setinsMobile] = useState("");
    const[insType,setinsType] = useState("");
    const[insMentors,setinsMentors] = useState("");
    const[insHeadquaters,setinsheadquaters] = useState("");
    const[insFounded,setinsFounded] = useState("");
    const[insboard,setinsboard] = useState("");
    const[insFeatures,setinsFeatures] = useState("");
    const[insWebsite,setinsWebsite] = useState("");


    //instiute profile updatiuon api

    const insLogoHandler = (e) => {
      setinstituteLogo(e.target.files[0]);
      
    }

    const insImageHandler = (e) => {
      setinstituteImage(e.target.files[0]);
    }

    const InstituteNameHandler = (e) => {

    }

    const InstituteEmailHandler = (e) => {
      setinsEmail(e.target.value);
    }

    const yearFounded = (e) => {
      setinsFounded(e.target.value);
    }

    const MentorHandler = (e) => {
      setinsMentors(e.target.value);
    }

    const FeaturesHandler = (e) => {
      setinsFeatures(e.target.value);
    }

    const websiteHandler = (e) => {
      setinsWebsite(e.target.value);
    }

    //institute update api call
    const token = localStorage.getItem("token")

    var myAccountData = new FormData();

    myAccountData.append('profile_dp',instituteLogo);
    myAccountData.append('institute_image',instituteImage);
    myAccountData.append('email',insEmail);
    myAccountData.append('institute_type',insType);
    myAccountData.append('no_of_mendors',insMentors);
    myAccountData.append('headquaters',insHeadquaters);
    myAccountData.append('founded',insFounded);
    myAccountData.append('features',insFeatures);
    myAccountData.append('website',insWebsite);

    const[abc,setabc] = useState(true)

    
    const saveChanges = (e) => {

    

      axios
      .patch("https://app.5am5pm.com:3000/institute_admin/institute_profile_update",myAccountData, { headers:{ Authorization: `Bearer ${token}`} })
      .then((res) => {
        console.log(res.data)
        if(res.data.status == "success"){
          setsnackOpen(true)
          setabc(!true);
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
      const url = "https://app.5am5pm.com:3000/institute_admin/institute_profile";
     axios
     .get(url,  { headers:{ Authorization: `Bearer ${token}`} })
     .then((res) => {
       console.log(res.data.data);
       setProfileGet(res.data.data);
     })
     .catch((err) => {
       console.log(err)
     }) 
    },[abc])







console.log("test",profileGet);




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
                    <Typography variant="h6">UPDATE YOUR INSTITUTE PROFILE</Typography>
                </div>
            </Grid>
        </Grid>

        <div className="heightStyle2"></div>
      
       
       
       
            <Grid item md={12} sm={12} xs={12}>
                <div className="ASimagecontainer">
                <img src={data.profile_dp} width="120px" height="120px" style={{borderRadius:'50%'}}></img>
                <div className="heightStyle2"></div>
              
               
                <Box sx={{p:'24px'}}>
                <Typography varaint="p" color="primary">UPLOAD YOUR INSTITUTE LOGO</Typography>
                </Box>
                
                <TextField variant="outlined" onChange={(e) => insLogoHandler (e)} type="file"></TextField>
               
                <Box sx={{p:'24px'}}>
                <Typography varaint="p" color="primary">UPLOAD YOUR INSTITUTE IMAGE</Typography>
                </Box>
                <TextField variant="outlined" onChange={(e) => insImageHandler (e)} type="file"></TextField>

                </div>
            </Grid>
    

        {/* 2nd row */}
     
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p"  color="primary">INSTITUTE NAME</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
                     <TextField variant="outlined" defaultValue={data.institute_name}  onChange={(e) => InstituteNameHandler (e)} fullWidth label="INSTITUTE NAME" id="fullWidth" />
                </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p"  color="primary">INSTITUTE EMAIL</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
            <TextField variant="outlined" defaultValue={data.email} onChange={(e) => InstituteEmailHandler (e)} fullWidth label="INSTITUTE EMAIL" id="fullWidth" />
                </Box>
            </Grid>
      


                    {/* 3rd row */}

                     
         
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p" color="primary">YEAR FOUNDED</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
            <TextField variant="outlined" onChange={(e) => yearFounded (e)} type="date" fullWidth  id="fullWidth" />
                </Box>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p"   color="primary">TOTAL NUMBER OF MENTORS</Typography>
            </Box>
            <Box
                sx={{width: '100%',mb:'10px' }}>
                      
            <TextField variant="outlined" defaultValue={data.no_of_mendors}  onChange={(e) => MentorHandler (e)} fullWidth label="NO OF MENTORS" id="fullWidth" />
                </Box>
            </Grid>
  


        {/* 4th row */}


       
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p" color="primary">UPDATE YOUR MOBILE NO</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
                     
            <TextField variant="outlined" defaultValue={data.mobile}  disabled fullWidth label="Mobile No" id="fullWidth" />
                </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
          
            </Grid>
      

        {/* 5th row */}
     
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p" color="primary">TELL ABOUT YOUR FEATURES</Typography>
            </Box>
            <Box sx={{width: '100%', }}>
            <TextField variant="outlined" defaultValue={data.features} onChange={(e) => FeaturesHandler (e)} fullWidth label="FEATURES" id="fullWidth" />
                </Box>
            </Grid>
       
  

                    {/* 6th row */}

                
            <Grid item md={12} sm={12} xs={12}>
            <Box sx={{p:'5px'}}>
            <Typography variant="p" color="primary">TELL US MORE ABOUT YOURSELF</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
                     
            <TextField variant="outlined" defaultValue={data.website}  onChange={(e) => websiteHandler (e)} fullWidth label="WEBSITE" id="fullWidth" />
                </Box>
            </Grid>
           
     
                    {/* last button */}
                    <div className='heightStyle1'></div>
                    <Grid container spacing={4}>
                    <Grid item md={12} sm={12} xs={12}>
                        <div style={{textAlign:'center'}}>
                            <Button
                            variant="contianed"
                            onClick={(e) => saveChanges (e)}
                            style={{backgroundColor:'#002db3',color:'#fff',borderRadius:0}}
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
           
       );
     })
}
     


     



      </Box>
    </Box>


                      {/* snackbar */}

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

export default InstituteAccountSettings;