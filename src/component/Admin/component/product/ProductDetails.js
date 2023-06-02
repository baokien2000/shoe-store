import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { shoesHome } from '../../../../redux/selector';
import NotFoundPage from '../../../NotFound/NotFoundPage';
import ProductInfo from './ProductInfo';


const ProductDetails = () => {
    const productId = useParams().productId
    const product = useSelector(shoesHome).find(item => item._id === productId)

    return product
        ? <ProductInfo product={product} />
        : <NotFoundPage />

};

export default ProductDetails;