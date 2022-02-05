import { Container } from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import TestimonialCrds from './TestimonialCardStyle';
import './TestimonialCarouselstyle.css';
import { Grid,Button,CardMedia,Card,CardContent,Typography,Divider,CardActions,Avatar,CardHeader,Stack } from '@mui/material';
import { blue,red } from '@mui/material/colors';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { ClassSharp } from '@mui/icons-material';
import axios from 'axios';
import Rating from '@mui/material/Rating';

//animate css
import 'animate.css';

//material icons
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';


//images
import pic1 from '../../Images/Testimonial/gandhi.jpg';
import pic2 from '../../Images/Testimonial/sanjiv.webp';


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


const TestimonialCard = () => {

    

    const breakPoints = [
        {width: 500, itemsToShow: 1},
        {width: 768, itemsToShow: 1},
        {width: 1200, itemsToShow: 1},
        {width: 1500, itemsToShow: 1},
      ]
        
      const classes = useStyles();


  


    
      
      

    return(

        

        <React.Fragment>
            


   
      
      
        <Carousel 
        //  enableAutoPlay autoPlaySpeed={1500}
        itemsToScroll={1}
        itemsToShow={1}
        itemPadding={[0, 4]}
        pagination={false}
        breakPoints={breakPoints}
         >
             

        
           
                    
                <TestimonialCrds number={
                <div className='testimonialphoto'>
                    <div style={{textAlign:'center',width:'100%'}}>
                    <img src={pic1} width='120px' height='120px' style={{borderRadius:'50%',display:'block',marginLeft:'auto',marginRight:'auto'}}></img>
                    <div style={{textAlign:'center'}}>
                    <i style={{fontSize:'24px'}}>Mr.MK GANDHI </i><br></br>
                    <small style={{fontSize:'16px'}}>NIFT IT Head</small>
                    </div>
                    
                    <i style={{fontSize:'18px'}}>' Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. '</i>
                    </div><br></br>
              
                
                </div>
                }
                />
             
                    
                      
             <TestimonialCrds number={
                <div className='testimonialphoto'>
                    <div style={{textAlign:'center',width:'100%'}}>
                    <img src={pic2} width='120px' height='120px' style={{borderRadius:'50%',display:'block',marginLeft:'auto',marginRight:'auto'}}></img>
                    <div style={{textAlign:'center'}}>
                    <i style={{fontSize:'24px'}}>Mr.Itagi Sanjeev</i><br></br>
                    <small style={{fontSize:'16px'}}>Delhi NIFT</small>
                    </div>
                    
                    <i style={{fontSize:'18px'}}>' Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. '</i>
                    </div><br></br>
              
                
                </div>
                }
                />
                
              
                
             
            
              
              
        

                
           
       </Carousel>

 


    

  <div style={{width:'100%',height:'100px'}}>

  </div>
        </React.Fragment>
    );
}

export default TestimonialCard;