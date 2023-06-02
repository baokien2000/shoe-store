import axios from 'axios';
import React, { useEffect } from 'react';

import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
const Login = () => {
    const [userData, setUserData] = useState([])
    const [isPageLogin, setIsPageLogin] = useState(true)

    useEffect(() => {
        const controller = new AbortController();
        const URL = 'https://kstore-api.onrender.com/users'
        let isMounted = true

        const getUser = async () => {
            try {
                const response = await axios({
                    url: URL,
                    method: 'get',
                    signal: controller.signal,
                })
                const usersName = response.data.map(user => user.name)
                isMounted && setUserData(usersName)
            } catch (e) {
                console.error(e);
            }
        }
        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        isPageLogin
            ? <LoginPage setIsPageLogin={setIsPageLogin} userData={userData} setUserData={setUserData} />
            : <RegisterPage setIsPageLogin={setIsPageLogin} userData={userData} setUserData={setUserData} />
    );
};

export default Login;