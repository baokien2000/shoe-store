import { VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminNewFeedback, AdminOrderData, AdminTab, AdminTableId, AdminUserData } from '../../redux/adminSelector';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import UserAvatar from "../../images/userImage.png"
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import styled from "styled-components";
import adminSlice from '../../redux/Slice/adminSlice';
import { userDetails } from '../../redux/selector';
import NotFoundPage from '../NotFound/NotFoundPage';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Popover } from 'antd';
import Logout from './component/Logout';
import { toast } from 'react-toastify';

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: red;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: red;
    }
  }
`;
const Header = ({ open }) => {
    const navigate = useNavigate()
    const [headerTitle, setHeaderTitle] = useState('')
    const currentTab = useSelector(AdminTab)
    const admin = useSelector(userDetails)
    const [width, height] = useWindowSize()
    const isNewFeedback = useSelector(AdminNewFeedback)

    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { pointAtCenter: true };
        return showArrow;
    }, [showArrow, arrowAtCenter]);


    useEffect(() => {
        setHeaderTitle(currentTab)
    }, [currentTab])
    const style = {
        //Side Bar
        open: {
            width: 'calc(100vw - 60px)',
            minWidth: 'calc(100vw - 60px)',
        },
        close: {
            width: '100vw',
            minWidth: '100vw',
        },
    }
    const content = (
        <>
            <p onClick={() => navigate("account")}>My account</p>
            <p onClick={() => navigate("change-password")}>Change Password</p>
            <p onClick={() => setOpenLogoutDialog(true)}>Logout</p>
        </>
    );
    const tabShowSearch = ['order report', 'user report', 'product report', 'feedback']
    return (
        <div className='Header' style={width < 516 ? (open ? style.open : style.close) : {}}>
            <b style={{ marginLeft: !open ? (width < 516 ? "40px" : (width < 700 ? "50px" : "0px")) : "0px" }}>{headerTitle}</b>
            <div>
                {tabShowSearch.includes(currentTab.toLowerCase()) && <FormControl
                    sx={{
                        m: 1, width: '25ch', '& label.Mui-focused': {
                            color: '#111'
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#111'
                            }
                        }
                    }}
                    variant="outlined"
                    size="small"
                    className='HeaderSearch'
                >
                    <InputLabel  >Search</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"

                        endAdornment={
                            <InputAdornment position="end" >
                                <IconButton
                                    aria-label="toggle search visibility"
                                    edge="end"
                                    sx={{
                                        "&.MuiButtonBase-root:hover":
                                            { bgcolor: "transparent" }
                                    }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search"
                    />
                </FormControl>}
                <div className='bell' onClick={() => navigate("feedbacks")}>
                    <NotificationsOutlinedIcon />
                    {isNewFeedback && <span />}
                </div>
                <hr />
                {admin ? admin.name === "BaoKien"
                    ? <img src={"/images/Avatar.jpg"} alt='avatar' />
                    : <img src={UserAvatar} alt='avatar' />

                    : <img src={"/images/Avatar.jpg"} alt='avatar' />
                }
                <div className='AvatarInfo'>
                    <b onClick={() => navigate("account")} style={{ cursor: "pointer" }}>{admin ? admin.name : "Bảo Kiên"}</b>
                    <span>{admin ? admin.admin : "Admin"}</span>
                </div>
                <Popover placement="bottomRight" content={content} >
                    <ExpandCircleDownOutlinedIcon className='InfoIcon' />
                </Popover>
                <Logout openLogoutDialog={openLogoutDialog} setOpenLogoutDialog={setOpenLogoutDialog} />

            </div>

        </div>
    )
};

export default Header;