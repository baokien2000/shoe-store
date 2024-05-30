import React, { useEffect, useState, useRef } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineCheck } from 'react-icons/ai';
import { getUserData } from '../../redux/Slice/userSlice';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

export const symbols = [' ', '"', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', `\'`, "]", '^', '_', '{', '|', '}', '~', '`', '+']
export const upcase = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', "I", 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', `N`, "M",]
export const lowcase = ['q', 'w', 'e', 'r', 't', 'y', 'u', "i", 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', `n`, "m",]
const RegisterPage = ({ setIsPageLogin, userData, setUserData }) => {
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [showComfirmPassword, setShowComfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState("")
    const [orderGender, setOrderGender] = useState("")
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');

    const [errorText, setErrorText] = useState('')

    const [errorName, setErrorName] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorGender, setErrorGender] = useState(false)
    const [errorOrderGender, setErrorOrderGender] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorComfirmPassword, setErrorComfirmPassword] = useState(false)


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowComfirmPassword = () => setShowComfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseDownComfirmPassword = (event) => event.preventDefault();



    const handleNameChange = (e) => {
        setName(e.target.value)
        setErrorName(false)
        setErrorText('')
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
        setErrorPhone(false)
        setErrorText('')
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrorEmail(false)
        setErrorText('')
    }
    const handleGenderChange = (event) => {
        const { target: { value }, } = event;
        setGender(value)
        setErrorGender(false)
        setErrorText('')
    };
    const handleOrderGenderChange = (e) => {
        setOrderGender(e.target.value)
        setErrorOrderGender(false)
        setErrorText('')
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setErrorPassword(false)
        setErrorText('')
    };
    const handleComfirmPasswordChange = (e) => {
        setComfirmPassword(e.target.value)
        setErrorComfirmPassword(false)
        setErrorText('')
    };




    const validateInfo = () => {
        if (name === '') {
            setErrorText('Please enter your name')
            setErrorName(true)
            return false;
        }
        if (phone === "") {
            setErrorText('Please enter your phone number')
            setErrorPhone(true)
            return false;
        }

        if (email === "") {
            setErrorText('Please enter your email')
            setErrorEmail(true)
            return false;
        }
        if (gender === "") {
            setErrorText('Please choose your gender')
            setErrorGender(true)
            return false;
        }


        if (password === '') {
            setErrorText('Please enter your password')
            setErrorPassword(true)
            return false;
        }
        if (comfirmPassword === '') {
            setErrorText('Please enter your comfirm password')
            setErrorComfirmPassword(true)
            return false;
        }

        if (name.length < 3) {
            setErrorText('Your name too short')
            setErrorName(true)
            return false;
        }

        if (phone.length !== 10) {
            setErrorText('Your phone number is not valid')
            setErrorPhone(true)
            return false;
        }

        if (!isEmail(email)) {
            setErrorText('Your email is not valid')
            setErrorEmail(true)
            return false;
        }
        if (symbols.some(substring => name.includes(substring))) {
            setErrorText('Name are not allowed to contain symbols')
            setErrorName(true)
            return false;
        }
        if (userData.includes(name)) {
            setErrorText('Name already exists')
            setErrorName(true)
            return false;
        }
        if (password.length < 8) {
            setErrorText('Password must be at least 8 characters')
            setErrorPassword(true)
            return false;
        }


        if (!symbols.some(substring => password.includes(substring))) {
            setErrorText('Password must have at least 1 symbol')
            setErrorPassword(true)
            return false;
        }
        if (!upcase.some(upcase => password.includes(upcase))) {
            setErrorText('Password must have at least 1 uppercase character')
            setErrorPassword(true)
            return false;
        }
        if (!lowcase.some(lowcase => password.includes(lowcase))) {
            setErrorText('Password must have at least 1 lowercase character')
            setErrorPassword(true)
            return false;
        }
        if (password !== comfirmPassword) {
            setErrorText('Password does not match')
            setErrorComfirmPassword(true)
            return false;
        }

        return true
    }


    const handleRegisterClick = () => {
        const controller = new AbortController();
        const URL = 'https://kstore-api.vercel.app/users'

        const validate = validateInfo()
        if (validate === true) {
            const Data = {
                name: name,
                password: password,
                gender: orderGender !== "" ? orderGender : gender,
                email: email,
                phone: phone,
                admin: "User",
            }
            const createUser = async () => {
                try {

                    const response = await axios({
                        url: URL,
                        method: 'post',
                        data: Data,
                        signal: controller.signal,
                    })
                    setIsPageLogin(true);
                    toast.success("Sign up success")
                    dispatch(getUserData())

                } catch (e) {
                    if (e.response.status === 409) {
                        setErrorText("UserName already exists")
                        setErrorName(true)

                    } else {
                        setErrorText("An error occurred, please try again later")
                    }
                    console.error(e);
                }
            }

            createUser();

            return () => {
                controller.abort();
            }
        }

    }

    return (
        <div className='LoginPage'>
            <Paper elevation={3} sx={{ p: 4, pt: 2, pb: 0 }}>

                <div className='Title'>
                    <b>Register</b>
                </div>
                <div className='Form'>
                    <TextField
                        error={errorName}
                        label="Name"
                        size="small"
                        sx={{ mt: '10px', width: "300px" }}
                        onChange={handleNameChange}
                        value={name}

                    />
                    <TextField
                        error={errorPhone}
                        label="Phone"
                        type='number'
                        size="small"
                        sx={{ mt: '10px', width: "300px" }}
                        onChange={handlePhoneChange}
                        value={phone}

                    />
                    <TextField
                        error={errorEmail}
                        label="Email"
                        size="small"
                        sx={{ mt: '10px', width: "300px" }}
                        onChange={handleEmailChange}
                        value={email}

                    />
                    <FormControl size='small' style={{ marginTop: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            error={errorGender}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={handleGenderChange}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    {gender === "Other" && <TextField
                        error={errorOrderGender}
                        label="Your gender"
                        size="small"
                        sx={{ mt: '10px', width: "300px" }}
                        onChange={handleOrderGenderChange}
                        value={orderGender}

                    />}
                    <FormControl error={errorPassword} size="small" sx={{ mt: '10px', width: "300px" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
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
                            label="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>

                    <FormControl error={errorComfirmPassword} size="small" sx={{ mt: '10px', width: "300px" }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            type={showComfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowComfirmPassword}
                                        onMouseDown={handleMouseDownComfirmPassword}
                                        edge="end"
                                    >
                                        {showComfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={comfirmPassword}
                            label="Confirm Password"
                            onChange={handleComfirmPasswordChange}
                        />
                    </FormControl>

                    <div className='footer'>
                        <div></div>
                        <span onClick={() => setIsPageLogin(true)}>Login</span>
                    </div>
                    <Button onClick={handleRegisterClick} sx={{ mt: '10px' }} variant="contained">Register</Button>
                </div>
                <p className='errorText'>{errorText}</p>
            </Paper>
            <div className='RegisterRule'>
                <div>

                    <li className={name.length >= 3 ? 'qualified' : ""}>Username have at least 3 character</li>
                    <li className={password.length >= 8 ? 'qualified' : ""}>Password have at least 8 character</li>
                    <li className={lowcase.some(substring => password.includes(substring)) ? 'qualified' : ""}>Password have must contain 1 lower case character</li>
                    <li className={upcase.some(substring => password.includes(substring)) ? 'qualified' : ""}>Password have must contain 1 upper case character</li>
                    <li className={symbols.some(substring => password.includes(substring)) ? 'qualified' : ""}>Password have must contain 1 symbol</li>
                </div>
                {/* <li>Password must match</li> */}
            </div>
        </div>
    );
};

export default RegisterPage;