import React from 'react';
import { Typography } from '@material-ui/core';

import './Footer.css'

const footer = () => {
    return (
        <div className='Footer'>
            <Typography variant='p' className='FooterText'>
                An Ecommerce Website by TCS Interactive Team &copy;TI 2019
            </Typography>
        </div>
    );
}

export default footer;