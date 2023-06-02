import React, { useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import KStoreLogo from "../../images/Logo.png"
import { makeStyles } from '@material-ui/core/styles';
import { ListItem } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { AdminTab } from '../../redux/adminSelector';
import adminSlice from '../../redux/Slice/adminSlice';
import { Link } from 'react-router-dom';
import LoginPage from '../Login/LoginPage';
import Logout from './component/Logout';


const SideBar = () => {
    const [openProduct, setOpenProduct] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false)


    const handleProductClick = () => {
        setOpenProduct(!openProduct);
    };
    const handleUserClick = () => {
        setOpenUser(!openUser);
    };
    const handleOrderClick = () => {
        setOpenOrder(!openOrder);
    };
    const handleSideBarIconClick = () => {
        setSideBarOpen(!sideBarOpen);
        setOpenProduct(false)
        setOpenUser(false)
        setOpenOrder(false)
    }
    const currentTab = useSelector(AdminTab)

    const selectedItem = (name) => {
        if (name === 'order') {
            if (currentTab === 'add order' || currentTab === 'order report' || currentTab === 'order details') {
                return { color: '#111', backgroundColor: "#f5f5f5" }
            } else {
                return { color: '#7b8185' }
            }
        }
        if (name === 'product') {
            if (currentTab === 'add product' || currentTab === 'product report') {
                return { color: '#111', backgroundColor: "#f5f5f5" }
            } else {
                return { color: '#7b8185' }
            }
        }
        if (name === 'user') {
            if (currentTab === 'add user' || currentTab === 'user report') {
                return { color: '#111', backgroundColor: "#f5f5f5" }
            } else {
                return { color: '#7b8185' }
            }
        }
        if (name === 'dashboard' && currentTab === 'dashboard') {
            return { color: '#111', backgroundColor: "#f5f5f5" }
        }
        if (name === 'logout' && currentTab === 'logout') {
            return { color: '#111', backgroundColor: "#f5f5f5" }
        }
        return currentTab === name
            ? { color: '#111' }
            : { color: '#7b8185' }
    }
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
            padding: '10px',

        },
        //Logo
        openImage: {
            height: '70px',
        },
        closeImage: {
            height: '40px',
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


        },
        closeIcon: {

            transform: 'rotate(180deg)',
        },
    }
    const dispatch = useDispatch();

    return (
        <>
            <List
                sx={sideBarOpen ? style.open : style.close}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" style={sideBarOpen ? style.openImageDiv : style.closeImageDiv}>
                        <img src={KStoreLogo} style={sideBarOpen ? style.openImage : style.closeImage} />
                        {/* {sideBarOpen
                        ? <KeyboardDoubleArrowLeftOutlinedIcon onClick={handleSideBarIconClick} />
                        : <KeyboardDoubleArrowRightOutlinedIcon onClick={handleSideBarIconClick} />
                    } */}
                        <KeyboardDoubleArrowLeftOutlinedIcon
                            onClick={handleSideBarIconClick}
                            style={sideBarOpen ? style.openIcon : style.closeIcon}
                        />

                    </ListSubheader>
                }
            >
                <div className='ScrollDiv'>

                    <Link to="/admin">
                        <ListItemButton style={selectedItem('dashboard')} >

                            <ListItemIcon><DashboardOutlinedIcon style={selectedItem('dashboard')} /></ListItemIcon>
                            <ListItemText primary="Dashboard" style={sideBarOpen ? style.openText : style.closeText} />
                        </ListItemButton>
                    </Link>


                    <ListItemButton onClick={handleOrderClick} style={selectedItem('order')}>
                        <ListItemIcon>
                            <InventoryOutlinedIcon style={selectedItem('order')} />
                        </ListItemIcon>
                        <ListItemText primary="Order" style={sideBarOpen ? style.openText : style.closeText} />
                        {openOrder ? <ExpandLess style={sideBarOpen ? style.openText : style.closeText} /> : <ExpandMore style={sideBarOpen ? style.openText : style.closeText} />}
                    </ListItemButton>
                    <Collapse in={openOrder} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Link to="/admin/order-add">
                                <ListItemButton sx={{ pl: 4 }} style={selectedItem('add order')} >
                                    <ListItemIcon >
                                        <AddCircleOutlineOutlinedIcon style={selectedItem('add order')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Add" style={sideBarOpen ? style.openText : style.closeText} />
                                </ListItemButton>
                            </Link>

                            <Link to="/admin/order-report">
                                <ListItemButton sx={{ pl: 4 }} style={selectedItem('order report')} >
                                    <ListItemIcon  >
                                        <QueryStatsOutlinedIcon style={selectedItem('order report')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Report" style={sideBarOpen ? style.openText : style.closeText} />
                                </ListItemButton>
                            </Link>

                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleProductClick} style={selectedItem('product')}>
                        <ListItemIcon>
                            <CategoryOutlinedIcon style={selectedItem('product')} />
                        </ListItemIcon>
                        <ListItemText primary="Product" style={sideBarOpen ? style.openText : style.closeText} />
                        {openProduct ? <ExpandLess style={sideBarOpen ? style.openText : style.closeText} /> : <ExpandMore style={sideBarOpen ? style.openText : style.closeText} />}
                    </ListItemButton>

                    <Collapse in={openProduct} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Link to="/admin/product-add">
                                <ListItemButton sx={{ pl: 4 }} style={selectedItem('add product')}  >
                                    <ListItemIcon >
                                        <AddCircleOutlineOutlinedIcon style={selectedItem('add product')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Add" style={sideBarOpen ? style.openText : style.closeText} />
                                </ListItemButton>
                            </Link>

                            <Link to="/admin/product-report">

                                <ListItemButton sx={{ pl: 4 }} style={selectedItem('product report')} >
                                    <ListItemIcon  >
                                        <QueryStatsOutlinedIcon style={selectedItem('product report')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Report" style={sideBarOpen ? style.openText : style.closeText} />
                                </ListItemButton>
                            </Link>

                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleUserClick} style={selectedItem('user')} >
                        <ListItemIcon>
                            <PersonOutlinedIcon style={selectedItem('user')} />
                        </ListItemIcon>
                        <ListItemText primary="User" style={sideBarOpen ? style.openText : style.closeText} />
                        {openUser ? <ExpandLess style={sideBarOpen ? style.openText : style.closeText} /> : <ExpandMore style={sideBarOpen ? style.openText : style.closeText} />}
                    </ListItemButton>

                    <Collapse in={openUser} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <Link to="/admin/user-report">
                                <ListItemButton sx={{ pl: 4 }} style={selectedItem('user report')} >
                                    <ListItemIcon>
                                        <QueryStatsOutlinedIcon style={selectedItem('user report')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Report" style={sideBarOpen ? style.openText : style.closeText} />
                                </ListItemButton>
                            </Link>

                        </List>
                    </Collapse>
                    <hr></hr>

                    {/* <Link to="/admin/logout"> */}
                    <ListItemButton style={selectedItem('logout')} onClick={() => setOpenLogoutDialog(true)} >
                        <ListItemIcon >
                            <LogoutOutlinedIcon style={selectedItem('logout')} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" style={sideBarOpen ? style.openText : style.closeText} />
                    </ListItemButton>
                    {/* </Link> */}

                </div>

            </List >
            <Logout openLogoutDialog={openLogoutDialog} setOpenLogoutDialog={setOpenLogoutDialog} />
        </>
    );
};

export default SideBar;