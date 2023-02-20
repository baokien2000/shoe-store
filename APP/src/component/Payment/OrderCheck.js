import React from 'react';
import { useSelector } from 'react-redux';
import PlaceOrderItem from './PlaceOrderItem';
import { shippingDetails, shoesList, subtotal } from '../../redux/selector';

const OrderCheck = () => {

    const cartLish = useSelector(shoesList).filter(item => item.cart !== 0)
    const subtotalCost = useSelector(subtotal)
    const details = useSelector(shippingDetails)
    return (
        <div className='PaymentForm'>
            <p>Place Order</p>

            {cartLish.map((item) => <PlaceOrderItem item={item} key={item._id} />)}

            <div className='ShippingDetails'>
                <p>Shipping Details</p>
                <div><b>Name:</b> <span>{details.lastName + ' ' + details.firstName}</span></div>
                <div><b>Phone:</b> <span>{details.phone.slice(0, 3) + ' ' + details.phone.slice(3, 6) + " " + details.phone.slice(6, 10)}</span></div>
                <div><b>Email:</b> <span>{details.email}</span></div>
                <div><b>Address:</b> <span>{details.address + ", " + details.city + ", " + details.country}</span> </div>
            </div>
            <div className='TotalPrice'>
                <span>Total Price:</span>
                <span>${(subtotalCost + 1.69).toFixed(2)}</span>
            </div>
        </div>
    );
};

export default OrderCheck;