import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTabs, bs, shoesHome } from "../../redux/selector";
import pageSlice from "../../redux/Slice/pageSlice";

function AppNavBar() {

    const IsActive = (index) => {
        const Active = useSelector(CurrentTabs)
        return Active === index ? { color: "#111", fontWeight: "bold" } : {};
    };

    let cartItem = useSelector(shoesHome)
    cartItem = cartItem.filter(item => item.cart !== 0)

    const dispatch = useDispatch();
    const SetActivePage = (index) => dispatch(pageSlice.actions.TabsChange(index))

    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Container>
                <Navbar.Brand >
                    <Link style={{ margin: 0 }} onClick={() => SetActivePage(0)} className="nav-link" to="/">
                        KStore
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={IsActive(0)} onClick={() => SetActivePage(0)} className="nav-link" to="/">
                            Home
                        </Link>
                        <Link style={IsActive(1)} onClick={() => SetActivePage(1)} className="nav-link" to="/Product">
                            Product
                        </Link>
                        <Link style={IsActive(2)} onClick={() => SetActivePage(2)} className="nav-link" to="/About">
                            About
                        </Link>
                    </Nav>
                    <Nav className="RigthNav">
                        <Link style={IsActive(3)} onClick={() => SetActivePage(3)} className="nav-link" to="/Cart">
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
