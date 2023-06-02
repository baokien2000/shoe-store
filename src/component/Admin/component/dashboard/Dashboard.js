import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import adminSlice from '../../../../redux/Slice/adminSlice';


import Chart from './Chart';
import Statistics from './Statistics';
const Dashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(adminSlice.actions.setTab("dashboard"))
    }, [])
    return (
        <div className='Dashboard'>
            <Statistics />
            <Chart />
        </div>
    );
};

export default Dashboard;