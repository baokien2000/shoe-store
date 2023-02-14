import { createSlice } from "@reduxjs/toolkit";
const defaultState = {
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    phone: '',
    phoneError: '',
    email: '',
    emailError: '',
    country: '',
    countryError: '',
    city: '',
    cityError: '',
    address: '',
    addressError: '',
}
export default createSlice({
    name: "shipping",
    initialState: defaultState,
    reducers: {
        // addPersonalInfo: (state, action) => {
        //     state.firstName = action.payload.firstName;
        //     state.lastName = action.payload.lastName;
        //     state.phone = action.payload.phone;
        //     state.email = action.payload.email;
        // },
        // addAddressInfo: (state, action) => {
        //     state.country = action.payload.country;
        //     state.city = action.payload.city;
        //     state.address = action.payload.address;
        // },
        clearInfo: (state) => {
            return defaultState;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload
        },
        setLastName: (state, action) => {
            state.lastName = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },


        setFirstNameError: (state, action) => {
            state.firstNameError = action.payload
        },
        setLastNameError: (state, action) => {
            state.lastNameError = action.payload
        },
        setPhoneError: (state, action) => {
            state.phoneError = action.payload
        },
        setEmailError: (state, action) => {
            state.emailError = action.payload
        },
        setCountryError: (state, action) => {
            state.countryError = action.payload
        },
        setCityError: (state, action) => {
            state.cityError = action.payload
        },
        setAddressError: (state, action) => {
            state.addressError = action.payload
        },

    }
})