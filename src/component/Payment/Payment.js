import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Finish from './Finish';
import PersonInfo from './PersonInfo';
import AddressInfo from './AddressInfo';
import OrderCheck from './OrderCheck';
import isEmail from 'validator/lib/isEmail';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails, shoesList } from '../../redux/selector';
import shippingSlice from '../../redux/Slice/shippingSlice';
import shoesSlice from '../../redux/Slice/shoesSlice';
import { useNavigate } from "react-router-dom";

const steps = ['Personal Information', 'Address  Information', 'Place your order'];

const Payment = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const dispatch = useDispatch()

    const details = useSelector(shippingDetails);
    const handleNext_Step1 = () => {
        let nextStep = true;

        if (details.firstName === '') {
            dispatch(shippingSlice.actions.setFirstNameError("First Name is required"))
            nextStep = false
        } else {
            if (details.firstName.length < 2) {
                dispatch(shippingSlice.actions.setFirstNameError("First Name must have at least 2 characters"))
                nextStep = false
            }
        }
        if (details.lastName === '') {
            dispatch(shippingSlice.actions.setLastNameError("Last Name is required"))
            nextStep = false
        } else {
            if (details.lastName.length < 2) {
                dispatch(shippingSlice.actions.setLastNameError("Last Name must have at least 2 characters"))
                nextStep = false
            }
        }
        if (details.phone === '') {
            dispatch(shippingSlice.actions.setPhoneError("Phone is required"))
            nextStep = false
        } else {
            if (details.phone.length !== 10) {
                dispatch(shippingSlice.actions.setPhoneError("Your phone is not valid"))
                nextStep = false
            }
        }
        if (details.email === '') {
            dispatch(shippingSlice.actions.setEmailError("Email is required"))
            nextStep = false
        } else {
            if (!isEmail(details.email)) {
                dispatch(shippingSlice.actions.setEmailError("Your email is not Valid"))
                nextStep = false
            }
        }
        if (nextStep === true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    const handleNext_Step2 = () => {
        let nextStep = true;
        if (details.country === '') {
            dispatch(shippingSlice.actions.setCountryError("Country is required"))
            nextStep = false
        }
        if (details.city === '') {
            dispatch(shippingSlice.actions.setCityError("City is required"))
            nextStep = false
        }
        if (details.address === '') {
            dispatch(shippingSlice.actions.setAddressError("Address is required"))
            nextStep = false
        }
        if (nextStep === true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }
    const Totop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }
    const handleNext_Step3 = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        dispatch(shippingSlice.actions.clearInfo());
        dispatch(shoesSlice.actions.clearCart())
        dispatch(shoesSlice.actions.AddToLocalStorage())
    }
    const handleNext = () => {
        switch (activeStep) {
            case 0:
                handleNext_Step1();
                break;
            case 1:
                handleNext_Step2();
                break;
            case 2:
                handleNext_Step3();
                break;
            default:
                break;
        }
        Totop();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const StepForm = () => {
        switch (activeStep) {
            case 0:
                return <PersonInfo />
            case 1:
                return <AddressInfo />
            case 2:
                return <OrderCheck />
            default:
                return;
        }
    }
    const StepperView = () => {
        return windowWidth > 767 ? false : true
    }
    // StepperView()    


    const resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };

    const navigate = useNavigate();
    const ShoeList = useSelector(shoesList)

    useEffect(() => {
        const cartList = ShoeList.filter(item => item.cart !== 0);
        if (ShoeList !== [] && cartList.length === 0) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);
    return (
        <div className='Payment'>
            <Container>
                <Stepper activeStep={activeStep} alternativeLabel={StepperView()}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {activeStep === steps.length
                    ? <Finish />
                    : <>
                        {StepForm()}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </>
                }
            </Container>
        </div>
    );
};

export default Payment;