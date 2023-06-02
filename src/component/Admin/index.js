import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageSlice from '../../redux/Slice/pageSlice';
import SideBar from './SideBar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from './component/dashboard/Dashboard';
import Logout from './component/Logout';
import OrderAdd from './component/order/OrderAdd';
import OrderReport from './component/order/OrderReport';
import ProductAdd from './component/product/ProductAdd';
import ProductReport from './component/product/ProductReport';
import UserReport from './component/UserReport';
import Header from './Header';
import OrderDetail from './component/order/OrderDetail';
import NotFoundPage from '../NotFound/NotFoundPage';
import ProductDetails from './component/product/ProductDetails';
import { userDetails } from '../../redux/selector';
const AdminPage = () => {



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(true))
    }, [])



    return (

        <div className='Admin'>

            <SideBar />
            <div className='Content'>
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/order-add" element={<OrderAdd />} />
                    <Route path="/order-report" element={<OrderReport />} />
                    <Route path="/order-report/:orderId" element={<OrderDetail />} />
                    <Route path="/product-add" element={<ProductAdd />} />
                    <Route path="/product-report" element={<ProductReport />} />
                    <Route path="/product-report/:productId" element={<ProductDetails />} />
                    <Route path="/user-report" element={<UserReport />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* <Route path='/*' exact={true} element={<NotFoundPage />} /> */}

                </Routes>
            </div>

        </div >

    );
};
export default AdminPage;