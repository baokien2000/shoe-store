import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterShoes } from '../../redux/selector';
import filterSlice from '../../redux/Slice/filterSlice';
import pageSlice from '../../redux/Slice/pageSlice';
import NotFound from '../NotFound/NotFound';
import Filter from './Filter';
import ShoesList from './ShoesList';

const Product = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.TabsChange(1));
        dispatch(filterSlice.actions.clearFilter())
    }, [dispatch])

    const filterProduct = useSelector(filterShoes)
    return (
        <div className='Product'>
            <Filter />
            {filterProduct.length !== 0
                ? <ShoesList />
                : <NotFound Title={'No Product Found'} />
            }
        </div>
    );
};

export default Product;