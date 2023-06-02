import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import pageSlice from '../../redux/Slice/pageSlice';
const NotFoundPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((pre) => { return pre - 1 })
            if (count === 0) {
                navigate("/")
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [count])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(false))
    }, [])
    return (
        <div className='NotFoundPage'>
            <h1>404</h1>
            <h3>Page Not Found!</h3>
            <span>Go back home page after {count}s</span>
        </div>
    );
};

export default NotFoundPage;