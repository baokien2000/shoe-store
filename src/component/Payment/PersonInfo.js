import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const PersonInfo = () => {
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [emailError, setEmailError] = useState('')
    return (
        <div className='PaymentForm'>
            <p>Personal Information</p>
            <TextField sx={{ mt: 2 }} label="First Name" variant="outlined"
                error={firstNameError !== ""}
                helperText={firstNameError !== "" && firstNameError}
            />

            <TextField sx={{ mt: 2 }} label="Last Name" variant="outlined"
                error={lastNameError !== ""}
                helperText={lastNameError !== "" && lastNameError}
            />
            <TextField sx={{ mt: 2 }} label="Phone" variant="outlined" type="number"

                error={phoneError !== ""}
                helperText={phoneError !== "" && phoneError} />
            <TextField sx={{ mt: 2 }} label="Email" variant="outlined"
                error={emailError !== ""}
                helperText={emailError !== "" && emailError} />
        </div>
    );
};

export default PersonInfo;