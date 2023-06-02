import { VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTab, AdminTableId } from '../../redux/adminSelector';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Avatar from "../../images/Avatar.jpg"
import UserAvatar from "../../images/userImage.png"
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import styled from "styled-components";
import adminSlice from '../../redux/Slice/adminSlice';
import { userDetails } from '../../redux/selector';
import NotFoundPage from '../NotFound/NotFoundPage';
import { useNavigate } from 'react-router-dom';

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
const Header = () => {
    const [headerTitle, setHeaderTitle] = useState('')
    const currentTab = useSelector(AdminTab)
    const admin = useSelector(userDetails)

    useEffect(() => {
        setHeaderTitle(currentTab)
    }, [currentTab])

    return (
        admin &&
        <div className='Header'>
            <b>{headerTitle}</b>
            <div>
                <FormControl
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
                >
                    <InputLabel >Search</InputLabel>
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
                </FormControl>
                <div className='bell'>
                    <NotificationsOutlinedIcon />
                    {/* <span></span> */}
                </div>
                <hr />
                {admin.name === "BaoKien"
                    ? <img src={Avatar} alt='avatar' />
                    : <img src={UserAvatar} alt='avatar' />
                }
                <div className='AvatarInfo'>
                    <b>{admin.name}</b>
                    <span>{admin.admin}</span>
                </div>
                <ExpandCircleDownOutlinedIcon />
            </div>

        </div>
    )
};

export default Header;