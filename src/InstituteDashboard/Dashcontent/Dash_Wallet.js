import React from 'react';
import { Paper,Grid, Typography, Tooltip } from '@mui/material';

//css
import './DashUsers.css';

const DashWallet = () => {
    return(
        <React.Fragment>
            <Grid container>
                <Grid item md={12}>

                <Paper elevation={2}>
                <div style={{padding:'12px'}}>

                {/* using grid inside paper */}

                <Grid container>
                   
                <Tooltip title="Total Availabe Balance in Your Wallet">
                    <Grid item md={3}>
                  <Typography variant="h2" className='walletHeader'>  <span className="walletRupeeSymbol">&#8377;</span> &nbsp;15499</Typography>
                    <Typography variant="body1"  className='cardCenter'>AVAILABLE BALANCE</Typography>
                    </Grid>
                    </Tooltip>
                   
                    <Tooltip title="Total No of Sales Shown Here">
                    <Grid item md={3}>
                    <Typography variant="h2" className='walletHeader'>24</Typography>
                    <Typography variant="body1"  className='cardCenter'>TOTAL SALES</Typography>
                    </Grid>
                    </Tooltip>

                    <Tooltip title="Amount which takes some time which reflect in your bank account will be shown in LOCKED FUNDS">
                    <Grid item md={3}>
                 
                    <Typography variant="h2" className='walletHeader'> <span className="walletRupeeSymbol">&#8377;</span> &nbsp;0</Typography>
                    <Typography variant="body1"  className='cardCenter'>LOCKED FUNDS</Typography>
                   
                    </Grid>
                    </Tooltip>

                    <Tooltip title="Total amount Debited to your Bank Account will be shown here">
                    <Grid item md={3}>
                 
                    <Typography variant="h2" className='walletHeader'> <span className="walletRupeeSymbol">&#8377;</span> &nbsp;53454</Typography>
                    <Typography variant="body1"  className='cardCenter'>Total Amount Debited</Typography>
                   
                    </Grid>
                    </Tooltip>

                </Grid>
                </div>



                </Paper>



                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DashWallet;