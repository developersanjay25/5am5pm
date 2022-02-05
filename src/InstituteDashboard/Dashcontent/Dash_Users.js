import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import Modal from '@mui/material/Modal';
import { Box, textAlign } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { Zoom } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Tooltip from '@mui/material/Tooltip';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from '@mui/icons-material/Close';

//css
import './DashUsers.css';

//mui styles
const useStyles = makeStyles({
    addusersIcn:{
        color:'#003db3 !important',
        fontSize:'50px',
        cursor:'pointer',
    },
})

//modal Style
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    height: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    boxShadow: 60,
    
  };




// default function
const Dash_Users  = () => {

  const[test,settest] = useState(false);

//backdrop hooks
const [openBckDrop, setOpenBckDrop] = React.useState(false);
 


    //table data hooks
    const [tData,setTdata] = useState([]);

    // token
    const token = localStorage.getItem("token");

    //api call using useEffect

    useEffect(() => {
      setOpenBckDrop(true)
        axios.get("https://app.5am5pm.com:3000/commonapi/display_staf_student_unique",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
        )
        .then((res) => {
          console.log(res.data.data)
            setTdata(res.data.data);
            if(res.data.status == "success"){
              setOpenBckDrop(false)
            }
            if(res.data.status == ""){
              setOpenBckDrop(false)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },[test])


    //edit icon api
    const Edit = () => {
        alert("Edit icon clicked API bending")
    }

    //delete icon api
    const Delete = () => {
        alert("Delete icon clicked API bending")
    }

    const columns = [
    
      
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'first_name', headerName: 'First name', width: 130 },
        { field: 'last_name', headerName: 'Last name', width: 130 },
        { field: 'mobile', headerName: 'Mobile', width: 130 },
        {
          field: 'email',
          headerName: 'Email',
          type: 'number',
          width: 240,
        },
        {
            field: "role",
            headerName: "Role",
            width: 130,
          },
          {
            field: "Edit",
            headerName: "Edit",
            sortable: false,
            width: 140,
            disableClickEventBubbling: true,
            renderCell: (params) => {
              return (
                <React.Fragment>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer", color: "#003db3" }}
                    onClick={Edit}
                  >
                    <EditIcon />
                  </div>
                </React.Fragment>
              );
            },
          },

          {
            field: "Delete",
            headerName: "Delete",
            sortable: false,
            width: 140,
            disableClickEventBubbling: true,
            renderCell: (params) => {
              return (
                <React.Fragment>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer", color: "#003db3" }}
                    onClick={Delete}
                  >
                    <DeleteIcon />
                  </div>
                </React.Fragment>
              );
            },
          },
      ];
    
    // table rows
    const rows = tData.map((obj, index) => ({ id: index + 1, ...obj }));
      
    // drawer width
    const drawerWidth = 240;

    // useStyles
    const classes = useStyles();

// ------------------------------------------------------- modal box for add users ------------------------------------- //

//slide animation hooks
const [myAnimation,setmyAnimation] = useState(false)

// modal code
const [open, setOpen] = React.useState(false);

// add users
const AddUsers = () => {
    setOpen(true);
    setmyAnimation(true);
}

//select item
const [age, setAge] = React.useState('');

const handleChange = (event) => {
  setAge(event.target.value);
};

// add users hooks
const [Add_Users,setAddUsers] = useState({
    first_name:'',
    last_name:'',
    email:'',
    mobile:'',
    role:'',
})

// helper text hooks or form validation

const [fHelper,setfHealper] = useState("");
const [lHealper,setlHelper] = useState("");
const [ehelper,setEhelper] = useState("");
const [mHelper,setmHelper] = useState("");
const [rHelper,setrHelper] = useState("");

//action err hooks or form validation
const [fErr,setfErr] = useState(false);
const [lErr,setlErr] = useState(false);
const [eErr,seteErr] = useState(false);
const [mErr,setmErr] = useState(false);
const [rErr,setrErr] = useState(false);



// error snack hooks

const [SnackErr, setSnackErr] = useState(false);
const [SnackMsg, setSnackMsg] = useState("");
     
// sncak handle close
     
const SnackhandleClose = () => {
setSnackErr(false);
};

 //progressBar hooks
 const [loading, setLoading] = useState(false);

//user data hander or change handler //
const userData = (e) => {
    const data = {...Add_Users}
    data[e.target.id] = e.target.value
    setAddUsers(data)
    console.log(data)
}

// staff / student submit button function and api
const submitbtn = () => {
var mailformat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(Add_Users.first_name == ""){
    setfHealper("Please Enter First Name")
    setfErr(true)
}else{
    setfHealper("");
    setfErr(false)
}
if(Add_Users.last_name == ""){
    setlErr(true)
    setlHelper("Please Enter Last Name");
}else{
    setlErr(false)
    setlHelper("");
}
if(!Add_Users.email.match(mailformat)){
    setEhelper("Please Enter Valid Email")
    seteErr(true)
}else{
    setEhelper("")
    seteErr(false)
}
if(Add_Users.mobile.length != 10){
    setmHelper("Please Enter Valid Mobile no")
    setmErr(true)
}else{
    setmHelper("");
    setmErr(false)
}

if(
    (Add_Users.first_name !="" 
    && Add_Users.last_name !="" 
    && Add_Users.email !="" 
    && Add_Users.mobile.length == 10) 
){
    SubmitApi();
}
}

const SubmitApi = () => {
  
  setLoading(true);

//  url
    const url =
        "https://app.5am5pm.com:3000/commonapi/staf_student_signup_inside";

    // post api call
    axios
    .post(url,
        {
            first_name: Add_Users.first_name,
            last_name: Add_Users.last_name,
            email: Add_Users.email,
            mobile: "91" + Add_Users.mobile,
            role: age,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
    .then((res) => {
     const status = res.data.status;
     if(status == "success"){
      setOpen(false);
      setLoading(false);
      settest(!test);
     }
    })
    
    .catch((err) => {
        setSnackErr(true);
          setSnackMsg(err.response.data.message);
    })
}



  //snackbar code

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, Sopen } = state;

  const handleClick = (newState) => () => {
    setState({ Sopen: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, Sopen: false });
  };

const closebtn = () => {
    setOpen(false);
    setfHealper("");
    setlHelper("");
    setEhelper("");
    setmHelper("");
    setfErr(false);
    setlErr(false);
    seteErr(false);
    setmErr(false);
    setmyAnimation(false);
}



    return(

        <React.Fragment>
           <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBckDrop}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      >   
     
     </DataGrid>
    </div>
  
  

        {/* Add users icon */}
        <div style={{height:'30px'}}></div>
        <Grid container>
            <Grid item md={12}>
                <div style={{textAlign:'right'}}>
                  <Tooltip title="Add Staff & Students" placement='left-end'>
                <GroupAddIcon className={classes.addusersIcn} onClick={AddUsers}/>
                </Tooltip>
                </div>
            </Grid>
        </Grid>

        {/* modal box code */}

        <div>
       
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        transitionComponent={Zoom}
      > 
    
        <Box sx={style}>
        
         
             {/* <div style={{textAlign:'right'}}>
                <CloseIcon onClick={closebtn} style={{cursor:'pointer'}}/>
            </div>  */}
         
            <div style={{padding:'25px'}}>
              <Typography variant='h6' style={{color:'#003db3'}}>ADD STAFF/STUDENTS</Typography>
            </div>
         
           
            <hr style={{margin:0}}></hr>
            <div style={{padding:'25px'}}>
          <Grid container spacing={2}>
            <Grid item md={6}>
            <TextField
            error={fErr} 
            fullWidth label="First Name" 
            id="first_name" 
            onChange={(e) => userData (e)}
            helperText={fHelper}
             />
            </Grid>
            <Grid item md={6}>
            <TextField 
            error={lErr}
            fullWidth label="Last Name"
             id="last_name"
            onChange={(e) => userData (e)}
            helperText={lHealper}
              />
            </Grid>
            <Grid item md={6}>
            <TextField
              error={eErr}
             fullWidth label="Email" 
             id="email" 
             onChange={(e) => userData (e)}
             helperText={ehelper}
             />
            </Grid>
            <Grid item md={6}>
            <TextField
              error={mErr}
             fullWidth label="Mobile"
              id="mobile"
               onChange={(e) => userData (e)}
               helperText={mHelper}
               />
            </Grid>
            <Grid item md={6}>
              
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="role"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem id="role" value={"Staf"}>Staff</MenuItem>
          <MenuItem id="role" value={"Student"}>Student</MenuItem>
         
        </Select>
      </FormControl>
    </Box>

            {/* <TextField

              error={rErr}
             fullWidth label="Role"
              id="role" 
              onChange={(e) => userData (e)}
              helperText={rErr}
              /> */}
            </Grid>
          </Grid>
         
          </div>

          <hr style={{margin:0}}></hr>
          <div style={{padding:'25px'}}>
          <Grid container>
              <Grid item md={12}>
                <div style={{textAlign:'right'}}>
                    <Button variant="contained" color="primary" onClick={submitbtn}
                    style={{backgroundColor:'#003db3',borderRadius:0}}
                   
                    >SUBMIT &nbsp; <Fade in={loading}
                    style={{
                      transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress style={{color:'white'}} size={20}/>
                  </Fade> 

                    {/* <Box sx={{ display: "flex" }}>
                    <CircularProgress
                    
                    size={20}
                    variant={ ? "indeterminate" : "determinate"}
                    style={{ color: "#fff", fontSize: "30px" }}
                    />
            </Box> */}

                    </Button> &emsp;
                    <Button
                     variant="contained"
                      color="primary" 
                      onClick={closebtn}
                      style={{backgroundColor:'#003db3',borderRadius:0}}
                      >Cancel</Button>
                </div>
              </Grid>
          </Grid>
          </div>
        </Box>
      </Modal>
     
    </div>

        {/* snackbar code */}

    <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={SnackErr}
            onClose={SnackhandleClose}
            message={SnackMsg}
            key={vertical + horizontal}
            autoHideDuration={6000}
          />

        </React.Fragment>
    );
}

export default Dash_Users;