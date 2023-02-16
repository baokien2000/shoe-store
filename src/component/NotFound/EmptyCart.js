import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <div className='EmptyCart'>
            <img src='./images/NotFound.png' alt='NotFound.png' />
            <p>Your Cart Is Empty</p>
            <Link to='/product'>
                <button>Shopping Now</button>
            </Link>
        </div>
    );
};

export default EmptyCart;