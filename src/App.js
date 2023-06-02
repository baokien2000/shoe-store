import AppNavBar from "./component/NavBar/AppNavBar";
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
import { ToastContainer, toast } from 'react-toastify';
import ShoesDetails from "./component/Product/ShoesDetails";
import { useDispatch, useSelector } from "react-redux";
import shoesSlice, { getDataFromMongo, getLocalStorageData, getShoesData } from "./redux/Slice/shoesSlice";
import AdminPage from "./component/Admin";
import NotFoundPage from "./component/NotFound/NotFoundPage";
import pageSlice from "./redux/Slice/pageSlice";
import { getOrdersData } from "./redux/Slice/adminSlice";
import Login from "./component/Login/Login";
import { getUserData } from "./redux/Slice/userSlice";
import { userDetails } from "./redux/selector";
import { redirect } from "react-router-dom";
function App() {
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch()

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


	useEffect(() => {
		dispatch(getShoesData())
		dispatch(getOrdersData())
		dispatch(getUserData())
	}, [])

	const admin = useSelector(userDetails)
	return (
		<div className="App">
			<Router>
				<AppNavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin/*" element={(admin?.admin === "Super Admin" || admin?.admin === "Admin") ? <AdminPage /> : <Login />} /> 
					<Route path="/product" element={<Product />} />
					<Route path="/product/:productId" element={<ShoesDetails />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/login" element={<Login />} />
					<Route path='*' exact={true} element={<NotFoundPage />} />
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
