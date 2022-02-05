import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid,CardActions } from '@mui/material';
import { Button } from "@mui/material";

import { makeStyles } from "@mui/styles";


//images

import img1 from '../Images/free course/1.jpg';
import img2 from '../Images/free course/2.jpg';
import img3 from '../Images/free course/3.jpg';

const useStyles = makeStyles({
    textstyle:{
        fontWeight:'700',
        fontSize:'20px',
        lineHeight:'100%',
        margin:'16px 16px 8px 16px',
    },

    textstyle2:{
        fontSize:'16px',
        lineHeight:'140%',
        margin:'8px 16px 8px 16px',
        WebkitBoxFlex:'1',
        flexGrow: '1',
    },
    buttonStyle:{
        margin:'8px 16px 8px 16px',
    }
})



const Free_course_cards = () => {

    const classes = useStyles();

    return(
        <React.Fragment>
            

        <Container>
            <Grid container spacing={4}>
                <Grid item md={4}>

             <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          weight='358'
          height="200"
          image={img1}
          alt="green iguana"
        />
        <CardContent>
        <p className={classes.textstyle}>Data Science</p>
           
          <p className={classes.textstyle2}>
            Build your foundation in the hottest industry
            of the 21sr century
          </p>

          <CardActions>
      <Button variant="outlined" size="large" className={classes.buttonStyle}>Know More</Button>
      </CardActions>
        </CardContent>
      </CardActionArea>
     
    </Card>

            </Grid>


            <Grid item md={4}>

<Card sx={{ maxWidth: 345 }}>
<CardActionArea>
<CardMedia
component="img"
weight='358'
height="200"
image={img2}
alt="green iguana"
/>
<CardContent>
<p className={classes.textstyle}>Data Science</p>

<p className={classes.textstyle2}>
Build your foundation in the hottest industry
of the 21sr century
</p>

<CardActions>
      <Button variant="outlined" size="large" className={classes.buttonStyle}>Know More</Button>
      </CardActions>
</CardContent>
</CardActionArea>
</Card>

</Grid>


<Grid item md={4}>

<Card sx={{ maxWidth: 345 }}>
<CardActionArea>
<CardMedia
component="img"
weight='358'
height="200"
image={img3}
alt="green iguana"
/>
<CardContent>
<p className={classes.textstyle}>Data Science</p>

<p className={classes.textstyle2}>
Build your foundation in the hottest industry
of the 21sr century
</p>

<CardActions>
      <Button variant="outlined" size="large" className={classes.buttonStyle}>Know More</Button>
      </CardActions>
</CardContent>
</CardActionArea>
</Card>

</Grid>


        </Grid>

        </Container>


    <div style={{width:'100%',height:'70px'}}>

    </div>
    
        </React.Fragment>
    );
}

export default Free_course_cards;