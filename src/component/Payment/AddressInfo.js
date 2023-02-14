import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
const AddressInfo = () => {
    const [cityError, setCityError] = useState('')
    const [countryError, setCountryError] = useState('')
    const [addressError, setAddressError] = useState('')
    return (
        <div className='PaymentForm'>
            <p>AddressInfo</p>

            <TextField sx={{ mt: 2 }} label="Country" variant="outlined" placeholder='VietNam'
                error={countryError !== ""}
                helperText={countryError !== "" && countryError}
            />
            <TextField sx={{ mt: 2 }} label="City" variant="outlined" placeholder='Ho Chi Minh'
                error={cityError !== ""}
                helperText={cityError !== "" && cityError}
            />

            <TextField sx={{ mt: 2 }} label="Address" variant="outlined" placeholder='House Number, Street, District'

                error={addressError !== ""}
                helperText={addressError !== "" && addressError} />
        </div>
    );
};

export default AddressInfo;