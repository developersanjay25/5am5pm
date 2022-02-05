import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid,CardActions } from '@mui/material';
import { Button } from "@mui/material";

import { makeStyles } from "@mui/styles";


//images

import img1 from '../Images/highlights/1.jpg';
import img2 from '../Images/highlights/2.jpg';
import img3 from '../Images/highlights/3.jpg';

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



const HeightLights_content = () => {

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

export default HeightLights_content;