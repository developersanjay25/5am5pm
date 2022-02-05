import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Stack, Grid } from "@mui/material";
import Carousel from "react-elastic-carousel";
import axios from "axios";

//files
import UniversityCarouselCard from "./University_carousel_card";

//material icons
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";

//material ui styles
import { Container, Button } from "@mui/material";

//import css file
import "./university.css";

//images
import img1 from "../Images/section_2/5.jpg";
import uniimg2 from "../Images/section_2/2.jpg";
import uniimg3 from "../Images/section_2/3.jpg";
import uniimg4 from "../Images/section_2/1.jpg";
import img2 from "../Images/icon-image/1.jpg";
import img3 from "../Images/icon-image/2.jpg";
import img4 from "../Images/icon-image/3.jpg";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  instiutePara: {
    fontSize: "15px",
    fontWeight: "300",
    lineHeight: "22px",
  },
}));

const University_Carousel = () => {
  const classes = useStyles();

  // storing instiute details

  const [insDetails, setInstDetails] = useState([]);

  //api call

  useEffect(() => {
    const url = "https://app.5am5pm.com:3000/institute_admin/all_institute";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data[1].images[0].institute_image);
        setInstDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ViewProgram = (e, institute_rollNo) => {
    window.location.href = `institute-details/?institute-id=${institute_rollNo}`;
  };

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1500, itemsToShow: 5 },
  ];

  return (
    <React.Fragment>
      <Carousel
        itemsToScroll={1}
        itemsToShow={4}
        itemPadding={[0, 4]}
        pagination={false}
        breakPoints={breakPoints}
      >
        {insDetails.map((data) => {
          return (
            <UniversityCarouselCard
              number={
                <Box sx={{ mb: "24px" }}>
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
                                ? data.images[0].profile_dp
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
              }
            />
          );
        })}
      </Carousel>
    </React.Fragment>
  );
};

export default University_Carousel;
