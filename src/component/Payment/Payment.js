import React from 'react';
import { Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Finish from './Finish';
import PersonInfo from './PersonInfo';
import AddressInfo from './AddressInfo';
import OrderCheck from './OrderCheck';
const steps = ['Personal Information', 'Address  Information', 'Place your order'];

const Payment = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
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
                return <PersonInfo />
        }
    }
    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <div className='Payment'>
            <Container>
                <Stepper activeStep={activeStep} alternativeLabel={false}>
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