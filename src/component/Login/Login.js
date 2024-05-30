import axios from 'axios';
import React, { useEffect } from 'react';

import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import pageSlice from '../../redux/Slice/pageSlice';
import { useDispatch } from 'react-redux';
const Login = ({ setOpenModel }) => {
    const [userData, setUserData] = useState([])
    const [isPageLogin, setIsPageLogin] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(false))

        // const controller = new AbortController();
        // const URL = 'https://kstore-api.vercel.app/users'
        // let isMounted = true

        // const getUser = async () => {
        //     try {
        //         const response = await axios({
        //             url: URL,
        //             method: 'get',
        //             signal: controller.signal,
        //         })
        //         const usersName = response.data.map(user => user.name)
        //         isMounted && setUserData(usersName)
        //     } catch (e) {
        //         console.error(e);
        //     }
        // }
        // getUser();

        // return () => {
        //     isMounted = false;
        //     controller.abort();
        // }
    }, [])

    return (
        isPageLogin
            ? <LoginPage setOpenModel={setOpenModel} setIsPageLogin={setIsPageLogin} userData={userData} setUserData={setUserData} />
            : <RegisterPage setIsPageLogin={setIsPageLogin} userData={userData} setUserData={setUserData} />
    );
};

export default Login;