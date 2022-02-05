import React, { useEffect,useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';

//material icons
import PeopleIcon from '@mui/icons-material/People';

//css
import './DashUsers.css';

const InsDashboard = () => {
    

    //getting token
    const token = localStorage.getItem("token");

    //hooks for the institute Staff,Student,Course and Enrolments
    const [InsData,setInsData] = useState([]);

    //api for institute Staff,Student,Course and Enrolments

    useEffect(() => {
        const url = "https://app.5am5pm.com:3000/institute_admin/count_data";
        axios
        .get(url,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            )
        .then((res) => {
           
            setInsData(res.data.data);
        })
        .catch((err) => {
            console.log(err)
        })

    },[])



    return(
        <div>

         


        <Grid container spacing={6}>
            <Grid item md={3} sm={6} xs={12}>
                <div style={{textAlign:'center'}}>
                    
                    <Paper className="insDashboardpaper" elevation={4}>
                    <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <div style={{textAlign:'left',padding:'15px'}}>
                            <Typography variant="h6">Mentors</Typography>
                            </div>
                            </Grid>
                        </Grid>
                    <Grid container>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle'>
                        <PeopleIcon className="insIconStyle"/>
                        </div>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle1'>
                                {
                                    InsData.map((data1) => {
                                        return(
                                            <Typography className="insPaperTxt">{(data1.stafCount !="") ? data1.stafCount : '0'}</Typography>
                                        );
                                    })
                                }
                            </div>
                        
                        </Grid>
                        </Grid>
                    </Paper>
                   
                </div>
            </Grid>

          {/* 2nd paper */}



          <Grid item md={3} sm={6} xs={12}>
                <div style={{textAlign:'center'}}>
                    
                    <Paper className="insDashboardpaper" elevation={4}>
                    <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <div style={{textAlign:'left',padding:'15px'}}>
                            <Typography variant="h6">Leaners</Typography>
                            </div>
                            </Grid>
                        </Grid>
                    <Grid container>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle'>
                        <PeopleIcon className="insIconStyle"/>
                        </div>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle1'>
                                {
                                    InsData.map((data) => {
                                        return(<Typography className="insPaperTxt">{(data.studentCount !="") ? data.studentCount : '0'}</Typography>)
                                    })
                                }
                            </div>
                        
                        </Grid>
                        </Grid>
                    </Paper>
                   
                </div>
            </Grid>



            {/* 3rd paper */}




            <Grid item md={3} sm={6} xs={12}>
                <div style={{textAlign:'center'}}>
                    
                    <Paper className="insDashboardpaper" elevation={4}>
                    <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <div style={{textAlign:'left',padding:'15px'}}>
                            <Typography variant="h6">Courses</Typography>
                            </div>
                            </Grid>
                        </Grid>
                    <Grid container>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle'>
                        <PeopleIcon className="insIconStyle"/>
                        </div>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle1'>
                            {
                                    InsData.map((data) => {
                                        return(<Typography className="insPaperTxt">{(data.courseCount != "") ?  data.courseCount : '0'}</Typography>)
                                    })
                                }
                            </div>
                        
                        </Grid>
                        </Grid>
                    </Paper>
                   
                </div>
            </Grid>


            {/* 4th paper */}

            <Grid item md={3} sm={6} xs={12}>
                <div style={{textAlign:'center'}}>
                    
                    <Paper className="insDashboardpaper" elevation={4}>
                    <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <div style={{textAlign:'left',padding:'15px'}}>
                            <Typography variant="h6">Enrolements</Typography>
                            </div>
                            </Grid>
                        </Grid>
                    <Grid container>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle'>
                        <PeopleIcon className="insIconStyle"/>
                        </div>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <div className='vericalalignstyle1'>
                                {
                                    InsData.map((data) => {
                                        return(<Typography className="insPaperTxt">{(data.courseEnrolled !="") ? data.courseEnrolled : '0'}  </Typography>)
                                    })
                                }
                            </div>
                        
                        </Grid>
                        </Grid>
                    </Paper>
                    
                </div>
            </Grid>


          



          {/* main container */}
        </Grid>
        </div>
    );
}

export default InsDashboard;