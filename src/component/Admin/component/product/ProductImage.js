import React from 'react';
import NotFoundImage from '../../../../images/NotFoundImage.jpg'
import ErrorImgae from '../../../../images/ImageError.png'

export const ProductImage = ({ URL }) => {
    if (URL === '') {
        return <img src={NotFoundImage} alt="NotFound" />
    }
    if (URL === 'error') {
        return <img src={ErrorImgae} alt='ErrorImgae' />
    }
    return <img src={URL} alt='Product' />
};
