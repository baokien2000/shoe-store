import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterShoes, shoesStatus } from '../../redux/selector';
import filterSlice from '../../redux/Slice/filterSlice';
import pageSlice from '../../redux/Slice/pageSlice';
import NotFound from '../NotFound/NotFound';
import Filter from './Filter';
import ShoesList from './ShoesList';
import SkeletonList from './SkeletonList';

const Product = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pageSlice.actions.TabsChange(1));
        dispatch(filterSlice.actions.clearFilter())
    }, [dispatch])
    useEffect(() => {
        dispatch(pageSlice.actions.setHideNavBar(false))
    }, [])
    const filterProduct = useSelector(filterShoes)
    const isLoading = useSelector(shoesStatus)
    return (
        <div className='Product'>
            <Filter />
            {isLoading === 'idle'
                ? (filterProduct.length !== 0
                    ? <ShoesList />
                    : <NotFound Title={'No Product Found'} />)
                : (<SkeletonList />)
            }
        </div>
    );
};

export default Product;