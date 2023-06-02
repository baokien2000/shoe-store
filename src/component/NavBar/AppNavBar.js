import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTabs, bs, shoesHome, hideNavBar } from "../../redux/selector";
import pageSlice from "../../redux/Slice/pageSlice";
import { useState } from "react";
import KStoreLogo from "../../images/Logo.png"

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
// import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};
function AppNavBar(props) {
    const [expanded, setExpanded] = useState(false); // const for Hide nar on link click
    const hideNavbar = useSelector(hideNavBar)
    const IsActive = (index) => {
        const Active = useSelector(CurrentTabs)
        return Active === index ? { color: "#111", fontWeight: "bold" } : {};
    };

    const cartItem = useSelector(shoesHome).filter(item => item.cart !== 0)

    const dispatch = useDispatch();
    const SetActivePage = (index) => dispatch(pageSlice.actions.TabsChange(index))

    const linkToggle = (index) => {
        setExpanded(false);
        SetActivePage(index)
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    return (
        <HideOnScroll {...props}>
            <AppBar>


                <Navbar collapseOnSelect expand="lg" variant="light" expanded={expanded} style={{ display: !hideNavbar ? "flex" : "none" }}>
            <Container>
                <Navbar.Brand >
                    <Link style={{ margin: 0 }} onClick={() => linkToggle(0)} className="nav-link" to="/">
                        <img src={KStoreLogo} alt="Logo" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={IsActive(0)} onClick={() => linkToggle(0)} className="nav-link" to="/">
                            Home
                        </Link>
                        <Link style={IsActive(1)} onClick={() => linkToggle(1)} className="nav-link" to="/product">
                            Product
                        </Link>
                        <Link style={IsActive(2)} onClick={() => linkToggle(2)} className="nav-link" to="/about">
                            About
                        </Link>
                    </Nav>
                    <Nav className="RigthNav">
                        <Link style={IsActive(3)} onClick={() => linkToggle(3)} className="nav-link" to="/cart">
                            <div>
                                        <AiOutlineShoppingCart />
                                <span>{cartItem.length}</span>
                            </div>
                                </Link>
                                <Link style={IsActive(4)} onClick={() => linkToggle(4)} className="nav-link" to="/login">
                                    <LoginIcon />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
                </Navbar>
            </AppBar>

        </HideOnScroll>

        // <HideOnScroll {...props}>
        //     <AppBar>
        //         <Toolbar>
        //             <Typography variant="h6" component="div">
        //                 Scroll to hide App bar
        //             </Typography>
        //         </Toolbar>
        //     </AppBar>
        // </HideOnScroll>

    );
}

export default AppNavBar;
