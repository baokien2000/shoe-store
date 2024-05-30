import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/Slice/pageSlice';
import SideBar from './SideBar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './component/dashboard/Dashboard';
import Logout from './component/Logout';
import OrderAdd from './component/order/OrderAdd';
import OrderReport from './component/order/OrderReport';
import ProductReport from './component/product/ProductReport';
import UserReport from './component/UserReport';
import Header from './Header';
import OrderDetail from './component/order/OrderDetail';
import NotFoundPage from '../NotFound/NotFoundPage';
import ProductDetails from './component/product/ProductDetails';
import { shoesHome, userDetails } from '../../redux/selector';

import axios from 'axios';
import userSlice from '../../redux/Slice/userSlice';
import { AdminOrderData } from '../../redux/adminSelector';
import Loading from '../Loading';
import ContructionModel from './component/ContructionModel';
import Feedback from './component/feedback';
import { getAllFeedback } from '../../api/admin/feedback';
import adminSlice from '../../redux/Slice/adminSlice';
import Account from './component/account';
import ChangePass from './component/changePass';
const AdminPage = ({ openModel, setOpenModel }) => {

    const navigate = useNavigate()
    const admin = useSelector(userDetails)
    const [open, setOpen] = useState(true)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(true))
        verifyAccess()
        async function fetchData() {
            const rep = await getAllFeedback()

            const containNewFeedback = rep.data.find(i => i.isRead === false) !== undefined

            dispatch(adminSlice.actions.setMewFeedback(containNewFeedback))
        }
        fetchData()

    }, [])

    const verifyAccess = () => {

        const controller = new AbortController();
        const URL = 'https://kstore-api.vercel.app/users/verify'

        const token = localStorage.getItem("token")
        const header = `token: Bearer ${token}`;
        const userLogin = async () => {
            try {
                const response = await axios({
                    url: URL,
                    method: 'get',
                    withCredentials: true,
                    signal: controller.signal,
                    headers: header,
                })
                if (response.status !== 200) {
                    navigate("/login")
                }
                dispatch(userSlice.actions.setUser(response.data))
            } catch (e) {
                if (e.response.status !== 200) {
                    navigate("/login")
                }
                navigate("/login")
            }
        }
        userLogin()
        return () => {
            controller.abort()
        }
    }
    return (

        admin ?
        <div className='Admin'>

                <SideBar setOpen={setOpen} />
            <div className='Content'>
                    <Header open={open} />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/change-password" element={<ChangePass />} />
                    <Route path="/order-add" element={<OrderAdd />} />
                    <Route path="/order-report" element={<OrderReport />} />
                    <Route path="/order-report/:orderId" element={<OrderDetail />} />
                        <Route path="/product-add" element={<ProductDetails />} />
                    <Route path="/product-report" element={<ProductReport />} />
                    <Route path="/product-report/:productId" element={<ProductDetails />} />
                    <Route path="/user-report" element={<UserReport />} />
                        <Route path="/feedbacks" element={<Feedback />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* <Route path='/*' exact={true} element={<NotFoundPage />} /> */}

                </Routes>
            </div>
                <ContructionModel setOpenModel={setOpenModel} openModel={openModel} />
        </div >

            : <Loading />
    );
};
export default AdminPage;