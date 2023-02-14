import React from 'react';
import { useParams } from 'react-router-dom';

const ShoesDetails = () => {
    const { productId } = useParams()

    return (
        <div className='ShoesDetails'>
            <p>ShoesDetails Page</p>
        </div>
    );
};

export default ShoesDetails;