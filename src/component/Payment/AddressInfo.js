import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDetails } from '../../redux/selector';
import shippingSlice from '../../redux/Slice/shippingSlice';
const AddressInfo = () => {
    // const [cityError, setCityError] = useState('')
    // const [countryError, setCountryError] = useState('')
    // const [addressError, setAddressError] = useState('')
    const details = useSelector(shippingDetails);
    const dispatch = useDispatch();

    const handelCountryChange = (e) => {
        if (e.target.value !== details.address) {
            dispatch(shippingSlice.actions.setCountryError(""))
        }
        dispatch(shippingSlice.actions.setCountry(e.target.value))
    }
    const handelCityChange = (e) => {
        if (e.target.value !== details.city) {
            dispatch(shippingSlice.actions.setCityError(""))
        }
        dispatch(shippingSlice.actions.setCity(e.target.value))
    }
    const handelAddressChange = (e) => {
        if (e.target.value !== details.address) {
            dispatch(shippingSlice.actions.setAddressError(""))
        }
        dispatch(shippingSlice.actions.setAddress(e.target.value))
    }
    return (
        <div className='PaymentForm'>
            <p>AddressInfo</p>

            <TextField sx={{ mt: 2 }} label="Country" variant="outlined" placeholder='VietNam'
                error={details.countryError !== ""}
                helperText={details.countryError !== "" && details.countryError}
                onChange={handelCountryChange}
                value={details.country || ''}
            />
            <TextField sx={{ mt: 2 }} label="City" variant="outlined" placeholder='Ho Chi Minh'
                error={details.cityError !== ""}
                helperText={details.cityError !== "" && details.cityError}
                onChange={handelCityChange}
                value={details.city || ''}
            />

            <TextField sx={{ mt: 2 }} label="Address" variant="outlined" placeholder='House Number, Street, District'
                error={details.addressError !== ""}
                helperText={details.addressError !== "" && details.addressError}
                onChange={handelAddressChange}
                value={details.address || ''} />
        </div>
    );
};

export default AddressInfo;