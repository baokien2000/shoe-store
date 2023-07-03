import React, { useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import KStoreLogo from "../../images/Logo.png"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import { useSelector } from 'react-redux';
import { AdminTab } from '../../redux/adminSelector';
import { Link } from 'react-router-dom';
import Logout from './component/Logout';
import { useWindowSize } from '../../hooks/useWindowSize';


const SideBar = ({ setOpen }) => {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false)

    const [width, height] = useWindowSize()
    const handleSideBarIconClick = () => {
        setSideBarOpen(!sideBarOpen);
        setOpen(pre => !pre)
    }
    const currentTab = useSelector(AdminTab)

    const selectedItem = (name) => {
        return currentTab.includes(name) === true ? { color: '#111' } : { color: '#7b8185' }
    }
    // width: calc(100vw - 100px) ;

    return (
        <>
            <List
                sx={sideBarOpen ? (width && width < 700 ? style.mobileOpen : style.open) : (width && width < 700 ? style.mobileClose : style.close)}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <Link to="/admin">
                        <ListSubheader component="div" id="nested-list-subheader" style={sideBarOpen ? width < 700 ? style.closeImageDiv : style.openImageDiv : style.closeImageDiv}>
                            <img src={KStoreLogo} style={sideBarOpen ? width < 700 ? style.closeMobileImage : style.openImage : style.closeImage} alt='Logo' />
                    </ListSubheader>
                    </Link>

                }
            >
                <div className='ScrollDiv'>


                    <KeyboardDoubleArrowLeftOutlinedIcon
                        onClick={handleSideBarIconClick}
                        className='SideBarIcon'
                        style={sideBarOpen ? style.openIcon : width < 700 ? width < 516 ? style.closeMobileIcon : style.closeTabletIcon : style.closeIcon}
                    />
                    <Link to="/admin">
                        <ListItemButton style={selectedItem('dashboard')} >

                            <ListItemIcon><DashboardOutlinedIcon style={selectedItem('dashboard')} /></ListItemIcon>
                            <ListItemText primary="Dashboard" style={sideBarOpen ? width < 516 ? style.closeText : style.openText : style.closeText} />
                        </ListItemButton>
                    </Link>

                    <Link to="/admin/order-report">
                        <ListItemButton style={selectedItem('order')} >
                            <ListItemIcon  >
                                <InventoryOutlinedIcon style={selectedItem('order')} />
                            </ListItemIcon>
                            <ListItemText primary="Order" style={sideBarOpen ? width < 516 ? style.closeText : style.openText : style.closeText} />
                        </ListItemButton>
                    </Link>

                    <Link to="/admin/product-report">
                        <ListItemButton style={selectedItem('product')}  >
                            <ListItemIcon >
                                <CategoryOutlinedIcon style={selectedItem('product')} />
                            </ListItemIcon>
                            <ListItemText primary="Product" style={sideBarOpen ? width < 516 ? style.closeText : style.openText : style.closeText} />
                        </ListItemButton>
                    </Link>

                    <Link to="/admin/user-report">
                        <ListItemButton style={selectedItem('user')} >
                            <ListItemIcon>
                                <PersonOutlinedIcon style={selectedItem('user')} />
                            </ListItemIcon>
                            <ListItemText primary="User" style={sideBarOpen ? width < 516 ? style.closeText : style.openText : style.closeText} />
                        </ListItemButton>
                    </Link>

                    <hr></hr>

                    <ListItemButton style={selectedItem('logout')} onClick={() => setOpenLogoutDialog(true)} >
                        <ListItemIcon >
                            <LogoutOutlinedIcon style={selectedItem('logout')} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" style={sideBarOpen ? width < 516 ? style.closeText : style.openText : style.closeText} />
                    </ListItemButton>

                </div>

            </List >
            <Logout openLogoutDialog={openLogoutDialog} setOpenLogoutDialog={setOpenLogoutDialog} />
        </>
    );
};

export default SideBar;

const style = {
    //Side Bar
    open: {
        width: '250px',
        minWidth: '250px',
        bgcolor: 'background.paper'
    },
    close: {
        width: '100px',
        minWidth: '100px',
        bgcolor: 'background.paper',
        // padding: '10px',

    },

    mobileOpen: {
        width: '60px',
        minWidth: '60px',
        bgcolor: 'background.paper',
        // padding: '10px',
    },

    mobileClose: {
        width: '0px',
        minWidth: '0px',
        // padding: "0 5px !important",
        bgcolor: 'background.paper',


    },
    //Logo
    openImage: {
        height: '60px',
    },
    closeImage: {
        height: '40px',
        padding: '5px 0',
    },
    closeMobileImage: {
        height: '28px',
        padding: '5px 0',
    },
    //Div chứa Logo
    openImageDiv: {
        // height: '70px',
    },
    closeImageDiv: {
        padding: '0px',
    },
    //text
    openText: {
        // height: '70px',
        opacity: "1",
        visibility: 'visible',
        transition: 'visibility 0.5s linear,opacity 0.5s linear',

    },
    closeText: {
        opacity: "0",
        visibility: 'hidden',
        transition: 'visibility 0.5s linear,opacity 0.5s linear',

    },
    //Close/open Icon
    openIcon: {
        // right: "-14px"
    },
    closeIcon: {
        // right: "-44px",
        transform: 'rotate(180deg)',
    },
    closeMobileIcon: {
        // right: "-44px",
        transform: ' translateX(30px) rotate(180deg)',
    },
    closeTabletIcon: {
        // right: "-44px",
        transform: ' translateX(40px) rotate(180deg)',
    },
}
