import React from "react";

const PlaceOrderItem = ({ item }) => {
    return (
        <div className="PlaceOrderItem">
            <div>
                <img src={item.imageUrl} />
                <span className="name">{item.name}</span>
            </div>
            <div>
                <span className="number">x{item.cart}</span>
                <span className="price">${((item.price * (1 - item.sale / 100)) * item.cart).toFixed(2)}</span>
            </div>
        </div>
    );
};

export default PlaceOrderItem;
