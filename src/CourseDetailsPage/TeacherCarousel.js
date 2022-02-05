import { Container } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import TeacherCarouselCard from './TeacherCarouselCard';
import './teachercarousel.css';
import { Grid,Button,CardMedia,Card,CardContent,Typography,Divider,CardActions,Avatar,CardHeader,Stack } from '@mui/material';
import { blue,red } from '@mui/material/colors';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { ClassSharp } from '@mui/icons-material';
import axios from 'axios';
import Rating from '@mui/material/Rating';

//animate css
import 'animate.css';

//images
import pic1 from '../Images/staff-profile/staff1.jpg';





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


const TeacherCarousel = (props) => {


   


    const breakPoints = [
        {width: 500, itemsToShow: 1},
        {width: 768, itemsToShow: 3},
        {width: 1200, itemsToShow: 4},
        {width: 1500, itemsToShow: 5},
      ]
        
      const classes = useStyles();


    


    
      
      

    return(

        

        <React.Fragment>
                  
        <Carousel 
        
        itemsToScroll={1}
        itemsToShow={4}
        itemPadding={[0, 4]}
        pagination={false}
        breakPoints={breakPoints}
         >
             

       
                    
                <TeacherCarouselCard number={
                    <div>
                    
                    <Card sx={{ width:'100%' }} className="cardstyle1">
                    <div className='heightStyle1'></div>
                  <img src={pic1} className='teacherimgStyling'></img>

                    
                     <CardContent>
                        <CardHeader title={props.staffname}
                        subheader="September 14, 2016" />
                     </CardContent>

                    </Card>
                          
 
       
                   
                    </div>
                }/>
     

                
           
       </Carousel>

 


    

  <div style={{width:'100%',height:'100px'}}>

  </div>
        </React.Fragment>
    );
}

export default TeacherCarousel;