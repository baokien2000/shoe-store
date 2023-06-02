import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import adminSlice from '../../../redux/Slice/adminSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import userSlice from '../../../redux/Slice/userSlice';
import { useNavigate } from 'react-router-dom';
import pageSlice from '../../../redux/Slice/pageSlice';
const Logout = ({ openLogoutDialog, setOpenLogoutDialog }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        setOpenLogoutDialog(false);
    };
    const handleLogoutClick = () => {
        dispatch(userSlice.actions.setUser(null))
        dispatch(pageSlice.actions.setHideNavBar(false))
        navigate("/login")
        handleClose()
    }
    return (
        <Dialog
            open={openLogoutDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" align='right' style={{
                padding: "5px 10px 0 0"
            }}>
                <CloseIcon
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={handleClose}
                />
            </DialogTitle>
            <DialogContent
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 100px 20px 100px"
                }}>

                <div className='powerCircle'
                    style={{
                        padding: "10px",
                        border: "2px solid #1d7c8e",
                        borderRadius: "50%"
                    }}>
                    <PowerSettingsNewIcon
                        style={{
                            color: "#1d7c8e",
                            height: "40px",
                            width: "40px",
                        }}
                    />
                </div>
                <b style={{ color: "#1d7c8e", marginBottom: "10px" }}>Hope to see you back soon</b>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to logout ?
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: "center", marginBottom: "20px" }}>

                <Button onClick={handleClose}
                    style={{
                        backgroundColor: "transparent",
                        color: "#1d7c8e",
                        textTransform: 'capitalize',
                        border: '2px solid #1d7c8e',
                        marginRight: "20px",
                        fontWeight: "bold",
                        paddingLeft: "20px",
                        paddingRight: "20px",

                    }}
                    autoFocus>
                    Cancel
                </Button>
                <Button
                    onClick={handleLogoutClick}
                    style={{
                        backgroundColor: "#00425a",
                        color: "white",
                        textTransform: 'capitalize',
                        border: '2px solid #00425a',
                        fontWeight: "bold",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                    }}>
                    Yes, I'm sure
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default Logout;