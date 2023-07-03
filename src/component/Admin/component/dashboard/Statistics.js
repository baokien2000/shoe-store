import React from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
const Statistics = () => {
    return (
        <div className='statistics'>
            <div className='Revenue'>
                <div className='Title'>
                    <LocalAtmOutlinedIcon />
                    <b>REVENUE</b>
                </div>
                <div className='Number'>
                    <span>9475$</span>
                    <div className='Percent Up'>
                        <NorthOutlinedIcon />
                        <span>12%</span>
                    </div>
                </div>
                <div className='Compare '>
                    <span>More than</span>
                    <b className='Up'>&nbsp; 1312 $ </b>
                </div>
            </div>
            <div className='Order'>
                <div className='Title'>
                    <LocalMallOutlinedIcon />
                    <b>ORDER</b>
                </div>
                <div className='Number'>
                    <span>1475</span>
                    <div className='Percent Up'>
                        <NorthOutlinedIcon />
                        <span>10%</span>
                    </div>
                </div>
                <div className='Compare'>
                    <span>More than</span>
                    <b className='Up'>&nbsp; 124 </b>
                </div>
            </div>
            <div className='User'>

                <div className='Title'>
                    <GroupOutlinedIcon />
                    <b>USER</b>
                </div>
                <div className='Number'>
                    <span>225</span>
                    <div className='Percent Up'>
                        <NorthOutlinedIcon />
                        <span>5%</span>
                    </div>
                </div>
                <div className='Compare '>
                    <span>More than</span>
                    <b className='Up'>&nbsp; 14 </b>
                </div>

            </div>
            <div className='Visitor'>

                <div className='Title'>
                    <RemoveRedEyeOutlinedIcon />
                    <b>VISITOR</b>
                </div>
                <div className='Number'>
                    <span>1852</span>
                    <div className='Percent Down '>
                        {/* <NorthOutlinedIcon /> */}
                        <SouthOutlinedIcon />
                        <span>5%</span>
                    </div>
                </div>
                <div className='Compare '>
                    <span>Less than</span>
                    <b className='Down'>&nbsp; 85 </b>
                </div>
            </div>
        </div>
    );
};

export default Statistics;