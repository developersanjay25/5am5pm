import React, { useEffect,useState } from "react";





//material ui
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from "@mui/material";

//images
import img1 from '../../../Images/menuicon/dummy.png';


//css files
import './IsLoggedStyles.css';
import axios from "axios";




const IsLogged = (props) => {

  const [profileData1,setprofileData1] = useState([]);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

    //getting roles and tokens
   useEffect(() => {
     if(role == "Student"){
      StudentProfilefunction();
     }

     if(role == "Staf"){
      StaffProfilefunction();
     }


     if(role == "Institute"){
       InstituteProfilefunction();
     }
   },[])


   const StudentProfilefunction = () => {

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

   }


   const StaffProfilefunction = () => {
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
  }
   


   const InstituteProfilefunction = () => {
    axios
    .get("https://app.5am5pm.com:3000/institute_admin/institute_profile",
    { headers:{ Authorization: `Bearer ${token}`} }
    )
    .then((res) => {
      console.log("testins",res.data.data)
      setprofileData1(res.data.data);
    })
    .catch((err) => {
      console.log(err)
    })
   }

   const Home = () => {
     window.location.href="/"
   }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
 
   

    const myDashboard = () => {
        if(props.userDetails == "Student" && props.userToken){
            StudentDashboard();
        }else if(props.userDetails == "Staf" && props.userToken){
            StaffDashboard();
        }else if(props.userDetails == "Institute" && props.userToken){
            InstituteDashboard();
        }
        handleClose();
    }

    const StudentDashboard = () => {
        window.location.href="/app/studentdashboard";
    }

    const StaffDashboard = () => {
        window.location.href="/app/staffdashboard";
    }

    const InstituteDashboard = () => {
        window.location.href="/app/institutedashboard";
    }

    const Logout = () => {
        localStorage.clear("role");
        localStorage.clear("token");
        window.location.reload(true);
        handleClose();
    }

    return(
        <React.Fragment>
         
            
                {
                     profileData1.map((data) => (  <img className="homeprofile" src={(data.profile_dp) ? data.profile_dp : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} width="36px" height="36px" style={{borderRadius:'50%'}} onClick={handleClick}></img>))
                }



            
             <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          profileData1.map((data) => (<MenuItem>Hi,{data.first_name}</MenuItem>))
        }
        <MenuItem onClick={Home}>HOME</MenuItem>
        <MenuItem onClick={myDashboard}>MY DASHBOARD</MenuItem>
        <MenuItem onClick={Logout}>LOG OUT</MenuItem>
      </Menu>
    </div>   

 {/* {
                          profileData1.map((data) => ( <Avatar sx={{ width: 40, height: 40 }}
                            style={{cursor:'pointer'}} 
                             src={data.profile_dp} />  ))
                           
                        } */}

 



        </React.Fragment>
    );
}

export default IsLogged;