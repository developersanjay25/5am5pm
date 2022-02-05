import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container,Grid } from "@mui/material";

//images

import img1 from '../Images/free live course/1.jpg';
import img2 from '../Images/free live course/2.jpg';
import img3 from '../Images/free live course/3.jpg';
import { height } from "@mui/system";

const Free_video_Live_clases1 = () => {
    return(
        <React.Fragment>
            <Container>
                <Grid container spacing={4}>
                    <Grid item md={4}>
             <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        weight='358'
        height="200"
        image={img2}
        alt="green iguana"
      />
      <CardContent>
        <p>Master Class</p>
        <p>Learn how to be successful & holistic 
            professional from life learnt masters for free
        </p>
      </CardContent>
      <CardActions>
        <Button size="large" variant="outlined">Explore Now</Button>
        
      </CardActions>
    </Card>
            </Grid>


            <Grid item md={4}>
             <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        weight='358'
        height="200"
        image={img3}
        alt="green iguana"
      />
      <CardContent>
        <p>Master Class</p>
        <p>Learn how to be successful & holistic 
            professional from life learnt masters for free
        </p>
      </CardContent>
      <CardActions>
        <Button size="large" variant="outlined">Explore Now</Button>
        
      </CardActions>
    </Card>
            </Grid>



            <Grid item md={4}>
             <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        weight='358'
        height="200"
        image={img1}
        alt="green iguana"
      />
      <CardContent>
        <p>Master Class</p>
        <p>Learn how to be successful & holistic 
            professional from life learnt masters for free
        </p>
      </CardContent>
      <CardActions>
        <Button size="large" variant="outlined">Explore Now</Button>
        
      </CardActions>
    </Card>
            </Grid>


        </Grid>
    </Container>
    <div style={{width:'100%', height:'70px'}}>

    </div>
        </React.Fragment>
    )
}

export default Free_video_Live_clases1;