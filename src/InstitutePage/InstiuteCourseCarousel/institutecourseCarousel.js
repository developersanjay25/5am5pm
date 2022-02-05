import { Container } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import Cardcrs from './institutecourseCard';
import './institutecarouselstyle.css';
import { Grid,Button,CardMedia,Card,CardContent,Typography,Divider,CardActions,Avatar,CardHeader,Stack } from '@mui/material';
import { blue,red } from '@mui/material/colors';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { ClassSharp } from '@mui/icons-material';
import axios from 'axios';
import Rating from '@mui/material/Rating';





const useStyles = makeStyles({
    title:{
        fontWeight:'700',
        fontSize:'2.4rem',
        letterSpacing:'-.02rem',
        lineHeight:'1.2',
        textTransform:'uppercase',
        textAlign:'center',
        color:'#222',
        fontFamily:'Roboto,sans-serif'
      }
})


const Courses = () => {

    //storing courses in the hooks
    const[HomeStoreCourse,setHomeStoreCourse] = useState([]);

    //get all courses

    useEffect(() => {
        axios
        .get("https://app.5am5pm.com:3000/commonapi/public_course")
        .then((res) => {
            console.log("asdf",res.data.data);
            setHomeStoreCourse(res.data.data);
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    // enrol page course
    const viewcourse = (e,_id) => {
        window.location.href=`course-details/?Course-id=${_id}`
    }

    const breakPoints = [
        {width: 500, itemsToShow: 1},
        {width: 768, itemsToShow: 3},
        {width: 1200, itemsToShow: 4},
        {width: 1500, itemsToShow: 5},
      ]
        
      const classes = useStyles();


      //rating 
      const [value, setValue] = React.useState(4);

      //crs details page
      const courseDetails = (e,_id) =>{
        window.location.href=`/course-details/?course-id=${_id}`
      }

      //crs purchase
      const buycourse = (e,_id) => {
        window.location.href=`/checkout?course-id=${_id}`;
      }


    
      
      

    return(

        

        <React.Fragment>
            

        <p className={classes.title} >Students are Viewing</p>
        

   
      
      
        <Carousel 
        
        itemsToScroll={1}
        itemsToShow={4}
        itemPadding={[0, 4]}
        pagination={false}
        breakPoints={breakPoints}
         >
             

        {
            HomeStoreCourse.map((courselist) => {
                return(
                    
                <Cardcrs number={
                    <div>
                    
                             

                             <Card style={{borderRadius:0,borderWidth:'0.2px',borderColor:'#222',borderStyle:'solid',height:'400px'}} sx={{ maxWidth: 345 }}>
                            
                             <div onClick={(e) => courseDetails (e,courselist._id)} style={{cursor:'pointer'}}>
     <>
     <img src={courselist.course_image} width="100%" height="150px"></img>
     </>
     <CardHeader style={{paddingTop:'2px',paddingBottom:'2px',paddingRight:'0'}}
      avatar={
          <Avatar sx={{ bgcolor: "#003db3" }} aria-label="recipe">
            5am
          </Avatar>
        }

      
        title={
            <p className='crsTitle'>{courselist.course_name}</p>
        }
     />
     
      <div className='instructorname'><i style={{color:'#222'}}>By</i> &nbsp;Tony George</div>
     <>
       <>
       <p className='descriptionStyle'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
       </>
      </>
    
    
   
     </div>
     <CardActions>
        
     
        <Button variant='contained' size="small" disableElevation style={{color:'#fff',width:'100%',backgroundColor:'#003db3',borderRadius:0}} onClick={(e) => buycourse (e,courselist._id)}>Buy Now </Button>
       
      
     </CardActions>
    


    </Card>

       
                   
                    </div>


 


                }/>
                );
            })
        }

                
           
       </Carousel>

 


    

  <div style={{width:'100%',height:'100px'}}>

  </div>
        </React.Fragment>
    );
}

export default Courses;