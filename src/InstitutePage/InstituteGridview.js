import React from "react";
import { Container, Grid, MenuItem,Paper, Breadcrumbs, Link, FormControl, TextField, Box, InputLabel, Select,Pagination, Checkbox,FormControlLabel,FormGroup } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect,useState } from "react";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Avatar from "@mui/material/Avatar";

//images
import img1 from '../Images/section_2/1.jpg';
import img2 from '../Images/section_2/2.jpg';
import img3 from '../Images/section_2/3.jpg';
import img4 from '../Images/section_2/4.png';

import locationicon from '../Images/icon-image/location.jpg';

//styles
import './instituteviewstyles.css';

//files
import ContactUs from "../AllCourses/Contact_Us";
import MenuBar from "../Home/AppBar/AppBar";
import AppBar2 from "../Home/AppBar2/AppBar2";
import Footer from "../Home/Footer/Footer";

//material icons
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

const InstituteGridView = () => {

    const Gridview = () => {
        window.location.href="/institute/gridview";
      }
      
      const listview = () => {
        window.location.href="/institute/listview"
      }

  const Enroll = () =>{
    window.location.href="/checkout";
  }



  function handleClick(event) {
    event.preventDefault();
    
  }

  //storing api data of institute course card
  const [storage1,setStorage1] = useState([])



  //api call

  useEffect(() => {
    axios
    .get('https://app.5am5pm.com:3000/institute_admin/all_institute')
    .then((res) =>{
      setStorage1(res.data.data)
    })
    .then((err) => {
      console.log(err)
    })
  },[])


const ViewProgram = (e,institute_rollNo) => {
  window.location.href=`/institute-details/?institute-id=${institute_rollNo}`
}

const home = () =>{
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
         <MenuBar/>
      <AppBar2/>
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
<div style={{height:'20px'}}></div>
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
          <MenuItem value={20}>Cambridge</MenuItem>
          <MenuItem value={30}>Anna University</MenuItem>
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
       
      &nbsp; <span style={{cursor:'pointer'}} onClick={Gridview}><GridViewIcon /></span> &nbsp;  <span style={{cursor:'pointer'}} onClick={listview}><ViewListIcon/></span> &nbsp; 
     
                                </div>
                            </Grid>
                           
                        </Grid>
                        
                    </Paper>

                    </div>



                    <br></br>
            {/* courses */}

<Grid container spacing={2}>

    {
      storage1.map((data) =>{
        return(
          <Grid item md={3}>
        
          <Grid container>
              <Grid item md={12}>
            
              {/* <Grid sx={{ width:"100%" ,height:"300px"}} className="insprofilecardstyle" onClick={(e) => institutedetailspage (e,data.institute_rollNo)}>
              <img className="crsinscard" src={(data.images[0] ? data.images[0].institute_logo : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg')} width='180px' height='180px'></img>
            
              <CardContent>
              <Typography variant="h6" style={{textAlign:'center'}}>{data.institute_name}</Typography>
              <Typography variant="body1" style={{textAlign:'center'}}><img src={locationicon} width="24px" height="24px" style={{lineHeight:'30px'}}></img>{data.country}</Typography>
              </CardContent>
         
             
 
              </Grid> */}





<Box>
                  <div className="institutecardstyle">
                    <Card
                      sx={{ width: "100%", height: "350px" }}
                      className="institutecardstyle"
                    >
                      <CardMedia
                        component="img"
                        width="100%"
                        height="150px"
                        image={
                          data.images[0]
                            ? data.images[0].institute_image
                            : "https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                        }
                        alt="Paella dish"
                      />
                      <div className="avatartextstyle">
                        <Avatar>
                          <img
                            width="40px"
                            height="40px"
                            src={
                              data.images[0]
                                ? data.images[0].institute_logo
                                : "https://us.123rf.com/450wm/urfandadashov/urfandadashov1806/urfandadashov180601827/150417827-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"
                            }
                          />
                        </Avatar>

                        <Typography variant="p" className="insidelinestyle">
                          {data.institute_name}
                        </Typography>
                      </div>

                      <Box sx={{ pl: "15px", pr: "15px" }}>
                        <p className="instiutePara">
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old.
                        </p>
                      </Box>

                      <div style={{ textAlign: "center" }}>
                        <Button
                          style={{ width: "90%" }}
                          color="primary"
                          variant="outlined"
                          size="larger"
                          onClick={(e) => ViewProgram(e, data.institute_rollNo)}
                        >
                          VIEW PROGRAM &nbsp; &#8594;
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Box>












              </Grid>
             
          </Grid>
     

</Grid>
        );
      })
    }
           
          






  



            {/* 4th course test */}




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
            <Footer/>
        </React.Fragment>
  );
};

export default InstituteGridView;
