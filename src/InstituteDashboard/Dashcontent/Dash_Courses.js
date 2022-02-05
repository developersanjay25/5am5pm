import React from 'react';
import { Grid,Card,CardActions,CardContent,CardMedia,Button,Typography  } from '@mui/material';

//css file
import './DashUsers.css';

const DashCourses = () => {
    return(
        <>

        {/* grid strating */}
        <Grid container spacing={2}>
       
        <Grid item md={4}>







        <Card sx={{ width:'100%',height:'550px'}} style={{padding:"16px"}}>
        <div className="stafbackGroundimg">
        <img src="https://images.wallpaperscraft.com/image/single/bokeh_highlights_multicolored_126758_2560x1080.jpg"
        width="100%" height="200px"
        ></img>
       
        <div className='imgprofilecontainer'>
        <div className='testclass'>
            <img src="https://media.istockphoto.com/photos/profile-picture-of-smiling-indian-female-employee-in-office-picture-id1258168128?k=20&m=1258168128&s=170667a&w=0&h=t0cKJkTS5YMCrdAqsRzHhzsjyfOvJgzrv3LtZyP8BCQ="
            width="120px" height="120px" style={{borderRadius:'50%'}}
            ></img>
        </div>
        </div>
        </div>

        <div style={{width:'100%',height:'60px'}}></div>



        {/* using grid inside card */}
        <Grid container>
        <Grid item md={12}>
        <div style={{textAlign:'center'}}>
            <Typography variant="h6">SOFIA</Typography>
            <Typography variant="overline">Assistant Professor in Department of Computer Science</Typography>
        </div>
        </Grid>
        </Grid>
        <div style={{width:'100%', height:'20px'}}></div>

        <Grid container>
        <Grid item md={4}>
        <div className='cardCenter'>
        <Typography variant="h6">12</Typography>
        <Typography variant="overline">Meetings</Typography>
        </div>
        </Grid>
        <Grid item md={4}>
        <div className='cardCenter'>
        <Typography variant="h6">7</Typography>
        <Typography variant="overline">Enrolments</Typography>
        </div>
        </Grid>
        <Grid item md={4}>
        <div className='cardCenter'>
        <Typography variant="h6">$5675</Typography>
        <Typography variant="overline">Revenue</Typography>
        </div>
        </Grid>
        </Grid>

        <div style={{width:'100%', height:'20px'}}></div>

        <Grid container>
        <Grid item md={12}>
        <div style={{textAlign:'center'}}>
        <Button variant="contained" style={{backgroundColor:'#003db3',color:'#fff'}}>View profile</Button>
        </div>
        </Grid>
        </Grid>








        
         </Card>



       
        </Grid>
         {/* |||| up end of grid item */}










        {/* 2nd row */}

        <Grid item md={4}>




            


<Card sx={{ width:'100%',height:'550px'}} style={{padding:"16px"}}>
<div className="stafbackGroundimg">
<img src="https://images.wallpaperscraft.com/image/single/bokeh_highlights_multicolored_126758_2560x1080.jpg"
width="100%" height="200px"
></img>

<div className='imgprofilecontainer'>
<div className='testclass'>
    <img src="https://media.istockphoto.com/photos/profile-picture-of-smiling-indian-female-employee-in-office-picture-id1258168128?k=20&m=1258168128&s=170667a&w=0&h=t0cKJkTS5YMCrdAqsRzHhzsjyfOvJgzrv3LtZyP8BCQ="
    width="120px" height="120px" style={{borderRadius:'50%'}}
    ></img>
</div>
</div>
</div>

<div style={{width:'100%',height:'60px'}}></div>



{/* using grid inside card */}
<Grid container>
<Grid item md={12}>
<div style={{textAlign:'center'}}>
    <Typography variant="h6">SOFIA</Typography>
    <Typography variant="overline">Assistant Professor in Department of Computer Science</Typography>
</div>
</Grid>
</Grid>
<div style={{width:'100%', height:'20px'}}></div>

<Grid container>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">12</Typography>
<Typography variant="overline">Meetings</Typography>
</div>
</Grid>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">7</Typography>
<Typography variant="overline">Enrolments</Typography>
</div>
</Grid>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">$5675</Typography>
<Typography variant="overline">Revenue</Typography>
</div>
</Grid>
</Grid>

<div style={{width:'100%', height:'20px'}}></div>

<Grid container>
<Grid item md={12}>
<div style={{textAlign:'center'}}>
<Button variant="contained" style={{backgroundColor:'#003db3',color:'#fff'}}>View profile</Button>
</div>
</Grid>
</Grid>









 </Card>




</Grid>
 {/* |||| up end of grid item */}













        {/* 3rd row */}


        <Grid item md={4}>




            


<Card sx={{ width:'100%',height:'550px'}} style={{padding:"16px"}}>
<div className="stafbackGroundimg">
<img src="https://images.wallpaperscraft.com/image/single/bokeh_highlights_multicolored_126758_2560x1080.jpg"
width="100%" height="200px"
></img>

<div className='imgprofilecontainer'>
<div className='testclass'>
    <img src="https://media.istockphoto.com/photos/profile-picture-of-smiling-indian-female-employee-in-office-picture-id1258168128?k=20&m=1258168128&s=170667a&w=0&h=t0cKJkTS5YMCrdAqsRzHhzsjyfOvJgzrv3LtZyP8BCQ="
    width="120px" height="120px" style={{borderRadius:'50%'}}
    ></img>
</div>
</div>
</div>

<div style={{width:'100%',height:'60px'}}></div>



{/* using grid inside card */}
<Grid container>
<Grid item md={12}>
<div style={{textAlign:'center'}}>
    <Typography variant="h6">SOFIA</Typography>
    <Typography variant="overline">Assistant Professor in Department of Computer Science</Typography>
</div>
</Grid>
</Grid>
<div style={{width:'100%', height:'20px'}}></div>

<Grid container>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">12</Typography>
<Typography variant="overline">Meetings</Typography>
</div>
</Grid>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">7</Typography>
<Typography variant="overline">Enrolments</Typography>
</div>
</Grid>
<Grid item md={4}>
<div className='cardCenter'>
<Typography variant="h6">$5675</Typography>
<Typography variant="overline">Revenue</Typography>
</div>
</Grid>
</Grid>

<div style={{width:'100%', height:'20px'}}></div>

<Grid container>
<Grid item md={12}>
<div style={{textAlign:'center'}}>
<Button variant="contained" style={{backgroundColor:'#003db3',color:'#fff'}}>View profile</Button>
</div>
</Grid>
</Grid>









 </Card>




</Grid>
 {/* |||| up end of grid item */}


















       {/*  end of grid container code */}
        </Grid>
        </>
    );
}

export default DashCourses;