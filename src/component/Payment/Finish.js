import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const Finish = ({ setActiveStep }) => {

    return (
        <div className='finish'>
            <div className='Thanks'>
                <p>Thanks for Your Order!</p>
                <span>We have emailed your order confirmation, and will send you an update when your order has shipped.</span>
                <span>Don't worry it's just a templete!</span>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Link to="/product" >
                    <Button >Continue Shopping</Button>
                </Link>
            </Box>
        </div>
    );
};

export default Finish;