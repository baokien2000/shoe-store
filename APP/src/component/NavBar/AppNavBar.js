import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTabs, bs, shoesHome } from "../../redux/selector";
import pageSlice from "../../redux/Slice/pageSlice";
import { useState } from "react";
import KStoreLogo from "../../images/Logo.png"
function AppNavBar() {
    const [expanded, setExpanded] = useState(false);

    const IsActive = (index) => {
        const Active = useSelector(CurrentTabs)
        return Active === index ? { color: "#111", fontWeight: "bold" } : {};
    };

    let cartItem = useSelector(shoesHome)
    cartItem = cartItem.filter(item => item.cart !== 0)

    const dispatch = useDispatch();
    const SetActivePage = (index) => dispatch(pageSlice.actions.TabsChange(index))

    const linkToggle = (index) => {
        setExpanded(false);
        SetActivePage(index)
    }
    return (
        <Navbar collapseOnSelect expand="lg" variant="light" expanded={expanded}>
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
                                {/* {item.cart !== 0 && <span>{item.cart}</span>} */}
                                <span>{cartItem.length}</span>
                            </div>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;
