import React from 'react';
import { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../redux/Slice/userSlice';
import { userDetails } from '../../redux/selector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsPageLogin, setOpenModel }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [errorText, setErrorText] = useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleNameChange = (e) => {
        setName(e.target.value)
        setNameError(false);
        setErrorText('')
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setPasswordError(false);
        setErrorText('')
    }

    const validate = () => {
        if (name === '') {
            setErrorText("Please enter your name")
            setNameError(true)
            return false
        }
        if (password === '') {
            setErrorText("Please enter your password")
            setPasswordError(true)
            return false
        }
        return true
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginClick = () => {
        const validateStatus = validate()
        if (validateStatus) {

            const controller = new AbortController();
            const URL = 'https://kstore-api.vercel.app/users/login'
            const Data = {
                name: name,
                password: password,
            }
            const userLogin = async () => {
                try {
                    const response = await axios({
                        url: URL,
                        method: 'post',
                        data: Data,
                        withCredentials: true,
                        signal: controller.signal,
                    })

                    setName('')
                    setPassword('')
                    // toast.success("Login Success! Welcome " + response.data.name)
                    dispatch(userSlice.actions.setUser(response.data))
                    localStorage.setItem("token", response.data.access)
                    setOpenModel(true)
                    response.data.admin === 'User' ? navigate('/') : navigate('/admin')

                } catch (e) {
                    console.log(e);
                    setErrorText('Username or password is not correct')
                }
            }
            userLogin()
            return () => {
                controller.abort()
            }
        }
    }

    return (
        <div className='LoginPage'>
            <Paper elevation={3} sx={{ p: 4, pt: 2, pb: 0 }}>

                <div className='Title'>
                    <b>Login</b>
                </div>
                <div className='Form'>
                    <TextField label="Name" size="small"
                        sx={{ mt: '10px', width: "300px" }}
                        value={name}
                        onChange={handleNameChange}
                        error={nameError}
                    />

                    <FormControl error={passwordError} size="small" sx={{ mt: '10px', width: "300px" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={password}
                            onChange={handlePasswordChange}
                            label="Password"
                        />
                    </FormControl>
                    <div className='footer'>
                        <div>
                            <input type="checkbox" id="Remember" name="Remember" value="Remember" />
                            <label htmlFor='Remember'>Remember me</label>
                        </div>
                        <span onClick={() => setIsPageLogin(false)}>Register</span>
                    </div>
                    <Button onClick={handleLoginClick} sx={{ mt: '10px' }} variant="contained">Login</Button>
                </div>
                <p className='errorText'>{errorText}</p>
            </Paper >
            <div className='TesttingAccount'>
                <p>Testing account &#40;admin&#41; </p>
                <div>


                    <span>Username: <i>Admin</i></span>
                    <span>Password: <i>Ad12345#</i></span >
                </div>
            </div>
        </div >
    );
};

export default LoginPage;