import React from 'react';
import { Paper, Grid, Divider, Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@material-ui/core";
import Modal from '@mui/material/Modal';
import { Box, width } from '@mui/system';


//recoil imports
import { useRecoilState } from 'recoil';

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        marginTop:'-70px',
        marginLeft:'20px',
        marginRight:'20px',
        height:'auto',
        borderRadius:'5px',
        width: '300px'
      },
      sidebarStyle3:{
        textAlign:'center'
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


const Drawer_Account_staff = () => {


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

    // const [openModal,setOpenModel] = useRecoilState(Rmodal);

    //my account

    const myaccount = () => {
      // setOpenModel(true)
    }

    return(
        <React.Fragment>
                <div className={classes.sidebarStyle}>
                
                </div>
                <Paper className={classes.sidebarStyle2}>
                <Stack direction="row" justifyContent="center">
                <Avatar sx={{ width: 90, height: 90 }}  style={{marginTop:'-50px'}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </Stack>
                <br></br>
                  <div className={classes.sidebarStyle3}>
                    <Typography><b>Welcome</b> 5am 5pm </Typography>
                    <Typography style={{margin:'auto'}} className={classes.emailstyle}><b>Name</b>: sanjayyyhsagdsafgasgdhGsagsjkashajhs</Typography>
                    <Typography style={{margin:'auto'}} className={classes.emailstyle}><b>Email</b>: admin@admin.comdhsajhdusahjshdad</Typography>
                    <Typography><b>User ID</b>: 524878</Typography>
                  </div>
                  <div className={classes.sidebarStyle4}>
                    <Button variant="outlined" style={{color:'#003db3'}} onClick={myaccount}>My Account</Button>&nbsp; <Button variant="contained" color="primary" onClick={signoutHandler}>Sign Out</Button> 
                  </div>
                  </Paper>
                       

                       {/* modal box code */}

                       <div>
      {/* <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </div>
            
        </React.Fragment>
    );

}

export default Drawer_Account_staff;