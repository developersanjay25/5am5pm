import React from "react";
import { Grid, Container, Paper, TextField, Box, FormControl,Breadcrumbs, InputLabel,Select,MenuItem, Typography, Button} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect,useState } from "react";
import axios from 'axios';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//images
import img1 from "../Images/section_2/1.jpg";
import img2 from "../Images/section_2/2.jpg";
import img3 from "../Images/section_2/3.jpg";
import img4 from "../Images/section_2/5.jpg";

//styles css
import './InstitutePageDataStyle.css';

//files
import ContactUs from '../AllCourses/Contact_Us';
import { typography } from "@mui/system";

//material icons
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

const InstitutePageData = () => {


//routes
const Gridview = () => {
  window.location.href="/institute/gridview";
}

const listview = () => {
  window.location.href="/institute/listview"
}

const insdetailspage = (e,institute_rollNo) => {
    window.location.href=`/institute-details/?institute-id=${institute_rollNo}`
}


const[storage2,setStorage2] = useState([])

useEffect(() =>{
    axios
    .get('https://app.5am5pm.com:3000/institute_admin/all_institute')
    .then((res) => {
        setStorage2(res.data.data)
    })
    .catch((err) => {
        console.log(err)
    })
},[])

function handleClick(event) {
    event.preventDefault();
    
  }

  const home = () => {
      window.location.href="/";
  }

const breadcrumbs = [
    <Link underline="hover" key="1" color="#fff" onClick={home}>
      HOME
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="#fff"
      href="/allCourses"
      onClick={handleClick}
    >
       INSTITUTE
    </Link>,
   
  ];

  return (
    <React.Fragment>
         <div>
        
               
        <div style={{ width:'100%',height:'100px', backgroundColor:'#f6f6f6',width:'100%'}}>
        <div className="bckpattern">
        <div className='breadstyle'>
               <Breadcrumbs
        separator={<NavigateNextIcon style={{color:'#fff'}} fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      </div> 
        </div>
        </div>
       

</div>
      
    <Grid container>
   
    </Grid>
    <Grid item md={12}>

    </Grid>
    <br></br>
    <Container maxWidth="xl">
        <Grid container spacing={4}>
            <Grid item md={3} sm={3} xs={12}>
                <Paper>
                    <div style={{padding:'25px 25px'}}>
                    
                    
                    <Box sx={{width:'100%'}}>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Choose Institute</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  
  label="Choose Category"

>
  <MenuItem value={10}>NIFT</MenuItem>

</Select>
</FormControl>
</Box>
<br></br>

   {/* top courses */}

   <Typography variant='body1'>Top Courses</Typography>

<FormGroup>
<FormControlLabel control={<Checkbox/>} label="Masters" />
<FormControlLabel control={<Checkbox/>} label="Doctorate" />
<FormControlLabel control={<Checkbox/>} label="Study Abroad" />
<FormControlLabel control={<Checkbox  />} label="For Working Professionals" />

</FormGroup>

<br></br>

{/* skill set */}

<Typography variant='body1'>Grade Level</Typography>

<FormGroup>
<FormControlLabel control={<Checkbox/>} label="UG" />
<FormControlLabel control={<Checkbox />} label="PG" />
<FormControlLabel control={<Checkbox />} label="Masters" />
<FormControlLabel control={<Checkbox />} label="Professional" />

</FormGroup>
<br></br>
{/* price */}

<Typography variant='body1'>Price</Typography>

<FormGroup>
<FormControlLabel control={<Checkbox  />} label="All" />
<FormControlLabel control={<Checkbox  />} label="Free" />
<FormControlLabel control={<Checkbox  />} label="Paid" />
</FormGroup>

<br></br>

                            <div style={{textAlign:'center'}}>
                            <Button style={{width:'100%',backgroundColor:'#003db3' ,color:'#fff'}} size='large'>Apply Filter</Button>
                            </div>
                    


                    </div>
                   
                </Paper>
            </Grid>




            <Grid item md={9} sm={9} xs={12}>
        <div style={{textAlign:'right'}}>
            <Paper style={{height:'56px'}}>
                <Grid container>
                    <Grid item md={2}>
                        <div style={{lineHeight:'56px'}}>
                        <span className='no-of-courses'>Showing 1-25 of 72</span>
                        </div>
                    </Grid>
                   
                    <Grid item md={10}>
                        <div style={{lineHeight:'56px'}}>
                        <span className='shortby'>Short By:</span>
                    
<FormControl style={{width:'100px', height:'40px'}}>
<InputLabel id="demo-simple-select-label">Short By</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Age"
>
  <MenuItem value={10}>Most Rated</MenuItem>
  <MenuItem value={20}>Most Viewed</MenuItem>
  <MenuItem value={30}>New Listings</MenuItem>
  <MenuItem value={30}>High Rated</MenuItem>
</Select>
</FormControl>

&nbsp; <span style={{cursor:'pointer'}} onClick={Gridview}><GridViewIcon/></span> &nbsp;  <span style={{cursor:'pointer'}} onClick={listview}><ViewListIcon/></span> &nbsp; 

                        </div>
                    </Grid>
                   
                </Grid>
                
            </Paper>

            </div>



            <br></br>
    {/* courses */}
<Grid container spacing={2}>


    {
        storage2.map((data) => {
            return(
                <Grid item md={12}>
    <Paper>
    <Grid container>
   
        <Grid item md={4}>
          
            <div style={{padding:'10px'}}>
            <img className="crsinscard" src={(data.images[0] ? data.images[0].institute_logo : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg')} width='180px' height='180px'></img>
            </div>
          
        </Grid>
        <Grid item md={8}>
            <div style={{padding:'10px'}}> 
           <h4 className='crs-tlt'>
           {data.institute_name}
           </h4>
            <Typography variant="body2" className="LVcountrystyle">{data.country}</Typography>
            <div className='crs-lst'>
            <h2><span style={{textAlign:'right',width:'100%'}}><button size='large' className='crs-enrol' onClick={(e) => insdetailspage (e,data.institute_rollNo)}>View Details</button></span></h2>
            </div>

           </div>
        </Grid>
       
    </Grid>
    </Paper>
    </Grid>
            );
        })
    }




 

 


    </Grid>






        </Grid>
            </Grid>


    

    </Container>

    <Grid container>
    
        <Grid item md={12} sm={12} xs={12}>
            <div style={{display:'flex', justifyContent:'center',padding:'25px'}}>
           
<Pagination count={10} />

      </div>      
        </Grid>
     
    </Grid>
    <br></br>
    <ContactUs/>
</React.Fragment>
  );
};

export default InstitutePageData;
