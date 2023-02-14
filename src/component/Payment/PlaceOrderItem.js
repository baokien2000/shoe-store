import React from 'react';

const PlaceOrderItem = ({ item }) => {
    return (
        <div className='PlaceOrderItem'>
            <img src={item.imageUrl} />
            <span className='name'>{item.name}</span>
            <span className='number'>x{item.cart}</span>
            <span className='price'>${(item.price * item.cart).toFixed(2)}</span>
        </div>
    );
};

export default PlaceOrderItem;