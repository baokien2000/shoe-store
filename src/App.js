import AppNavBar from "./component/NavBar/AppNavBar";
import Button from "react-bootstrap/Button";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Cart from "./component/Cart/Cart";
import Product from "./component/Product/Product";
import About from "./component/About/About";
import Payment from "./component/Payment/Payment";
import { useEffect, useState } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";
import AppFooter from "./component/Footer/AppFooter";
import { BsCheckCircleFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import ShoesDetails from "./component/Product/ShoesDetails";
import { useDispatch } from "react-redux";
import shoesSlice from "./redux/Slice/shoesSlice";

function App() {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);
	const dispatch = useDispatch()
	useEffect(() => {
		// dispatch(shoesSlice.actions.AddToLocalStorage())

		dispatch(shoesSlice.actions.GetFromLocalStorage())
	}, [])
	return (
		<div className="App">
			<Router>
				<AppNavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product" element={<Product />} />
					<Route path="/product/:productId" element={<ShoesDetails />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/payment" element={<Payment />} />
				</Routes>
				<AppFooter />
				{isVisible && (
					<button onClick={scrollToTop}>
						<RxDoubleArrowUp />
					</button>
				)}

				<ToastContainer autoClose={1500} />

			</Router>
		</div>
	);
}

export default App;
