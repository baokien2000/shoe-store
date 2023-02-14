import React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails } from '../../redux/selector';
import shippingSlice from '../../redux/Slice/shippingSlice';

const PersonInfo = () => {

    const details = useSelector(shippingDetails);
    const dispatch = useDispatch();
    const handelFirstNameChange = (e) => {
        if (e.target.value !== details.firstName) {
            dispatch(shippingSlice.actions.setFirstNameError(""))
        }
        dispatch(shippingSlice.actions.setFirstName(e.target.value))
    }
    const handelLastNameChange = (e) => {
        if (e.target.value !== details.lastName) {
            dispatch(shippingSlice.actions.setLastNameError(""))
        }
        dispatch(shippingSlice.actions.setLastName(e.target.value))
    }
    const handelPhoneChange = (e) => {
        if (e.target.value !== details.phone) {
            dispatch(shippingSlice.actions.setPhoneError(""))
        }
        dispatch(shippingSlice.actions.setPhone(e.target.value))
    }
    const handelEmailChange = (e) => {
        if (e.target.value !== details.email) {
            dispatch(shippingSlice.actions.setEmailError(""))
        }
        dispatch(shippingSlice.actions.setEmail(e.target.value))
    }
    return (
        <div className='PaymentForm'>
            <p>Personal Information</p>
            <TextField sx={{ mt: 2 }} label="First Name" variant="outlined"
                error={details.firstNameError !== ""}
                helperText={details.firstNameError !== "" && details.firstNameError}
                onChange={handelFirstNameChange}
                value={details.firstName || ''}
            />

            <TextField sx={{ mt: 2 }} label="Last Name" variant="outlined"
                error={details.lastNameError !== ""}
                helperText={details.lastNameError !== "" && details.lastNameError}
                onChange={handelLastNameChange}
                value={details.lastName || ''}
            />
            <TextField sx={{ mt: 2 }} label="Phone" variant="outlined" type="number"
                error={details.phoneError !== ""}
                helperText={details.phoneError !== "" && details.phoneError}
                onChange={handelPhoneChange}
                value={details.phone || ''}

            />

            <TextField sx={{ mt: 2 }} label="Email" variant="outlined"
                error={details.emailError !== ""}
                helperText={details.emailError !== "" && details.emailError}
                onChange={handelEmailChange}
                value={details.email || ''}
            />
        </div>
    );
};

export default PersonInfo;