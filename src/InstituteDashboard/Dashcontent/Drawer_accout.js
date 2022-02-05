import React,{useState,useEffect} from 'react';
import { Paper, Grid, Divider, Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import { Box, typography } from '@mui/system';
import axios from 'axios';


//css style sheet
import './Drawerstyle.css';


//recoil imports
import { useRecoilState } from 'recoil';
import { Rmodal } from '../InstituteRecoil';




//modal styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


//styles

const useStyles = makeStyles({
    sidebarStyle:{
        height:'150px',
        backgroundColor:'#003db3',
        borderStyle:'none',
        paddingTop:'0px',
      },
      sidebarStyle2:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'250px',
        borderRadius:'5px',
        width:'320px',
        marginLeft:'25px',
        marginRight:'25px',
        marginTop:'-70px',
      },
      sidebarStyle3:{
        textAlign:'center',
        
      },
      sidebarStyle4:{
        textAlign:'center',
        margin:'20px'
      },
      emailstyle:{
        textOverflow:'ellipsis',
        width:'80%',
        whiteSpace:'nowrap',
        overflow:'hidden',
        margin:'auto',
        textAlign:'center'
      }
})


const Drawer_Account = () => {


    //modal function
    const [open, setOpen] = React.useState(false);
    const modalhandleClose = () => setOpen(false);

    const classes = useStyles();

    //signout function

    const signoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href="/";
    }

    //modal function using recoil

    const [openModal,setOpenModel] = useRecoilState(Rmodal);

    //my account

    const myaccount = () => {
     window.location.href="/app/institutedashboard/myaccount";
    }




    //getting profile api

    const[profileData,setprofileData] = useState([])

    const token = localStorage.getItem("token");

    //get api for stuident profile 

    useEffect(() => {
      axios
      .get("https://app.5am5pm.com:3000/institute_admin/institute_profile",
      { headers:{ Authorization: `Bearer ${token}`} }
      )
      .then((res) => {
        console.log(res.data.data)
        setprofileData(res.data.data);
      })
      .catch((err) => {
        console.log(err)
      })
    },[])


    return(
        <React.Fragment>
                <div className={classes.sidebarStyle}>
                
                </div>
               
                       

                     
                  {
                profileData.map((data) => {
                  return(
                    <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.sidebarStyle2}>
                <Stack direction="row" justifyContent="center">
                <Avatar sx={{ width: 90, height: 90 }}  style={{marginTop:'-50px'}} alt="Cindy Baker" src={data.profile_dp} />
                </Stack>
                <br></br>
                  <div className={classes.sidebarStyle3}>
                 
                    {/* <Typography ><span style={{fontWeight:'900'}}>Welcome,</span> &nbsp;<span >{data.institute_name.toUpperCase()}</span></Typography>
                    <Typography className='textstyleeclipse'><span style={{fontWeight:'900'}}>Institute Email:</span> &nbsp;<span className='abcd'>gsfgsfgsfghsfgsfgsfgsfgsfgsfsdfghdsgfghdgfhdghdghdghdghd</span></Typography>
                    <Typography><span style={{fontWeight:'900'}}>Institute Id:</span> &nbsp;{data.institute_rollNo.toUpperCase()}</Typography> */}
                  
                  <div className={classes.sidebarStyle3}>
                  <Typography style={{margin:'auto'}} className={classes.emailstyle}><b>Institute Name</b>: {data.institute_name}</Typography>
                    <Typography style={{margin:'auto'}} className={classes.emailstyle}><b>Email</b>: {data.email}</Typography>
                    <Typography style={{margin:'auto'}} className={classes.emailstyle}><b>Institute Id</b>: {data.institute_rollNo}</Typography>
                    
                  </div>



                  </div>
                  <div className={classes.sidebarStyle4}>
                    <Button variant="outlined" style={{color:'#003db3'}} onClick={myaccount}>My Account</Button>&nbsp; <Button variant="contained" color="primary" onClick={signoutHandler}>Sign Out</Button> 
                  </div>
                  </Paper>
                  </Grid>
                </Grid>
                  );
                })
              }

                       
            
        </React.Fragment>
    );

}

export default Drawer_Account;