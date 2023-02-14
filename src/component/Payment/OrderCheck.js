import React from 'react';
import Item from '../Cart/Item';
import PlaceOrderItem from './PlaceOrderItem';

const OrderCheck = () => {
    const ItemTest = {
        id: 2,
        brand: 'Vans',
        name: 'Vans Authentic DIY HC Lemon Chrome',
        imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/vn0a4uuc1ae-4.jpg',
        price: 6.31,
        sale: 17,
        rate: 5,
        color: 'Yellow',
        size: [36, 37, 38, 40, 41],
        cart: 2

    }

    return (
        <div className='PaymentForm'>
            <p>Place Order</p>
            <PlaceOrderItem item={ItemTest} />
            <PlaceOrderItem item={ItemTest} />
            <PlaceOrderItem item={ItemTest} />
            <div className='ShippingDetails'>
                <p>Shipping Details</p>
                <div><b>Name:</b> <span>Kin</span></div>
                <div><b>Phone:</b> <span>0336783456</span></div>
                <div><b>Email:</b> <span>Kin@gmail.com</span></div>
                <div><b>Address:</b> <span>246/34, Nguyễn Trãi, Phường 9, Quận 5, Hồ Chí Minh city, Viet Nam.</span> </div>
            </div>
            <div className='TotalPrice'>
                <span>Total Price:</span>
                <span>$248.68</span>
            </div>
        </div>
    );
};

export default OrderCheck;