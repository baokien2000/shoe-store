import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Shoe from "../../data/shoe";
import PaginationRounded from './PaginationRounded';
import ShoesCard from './ShoesCard';

// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';
import { CurrentPages, filterShoes } from '../../redux/selector';
const ShoesList = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(Shoe);
    const [pageNum, setPageNum] = useState(1)

    const myref = useRef(null)

    const Filltershoes = useSelector(filterShoes)
    const CurrentPage = useSelector(CurrentPages);
    useEffect(() => {
        setCurrentData(CurrentPage !== 1
            ? Filltershoes.slice(12 * CurrentPage - 12, 12 * CurrentPage)
            : Filltershoes.slice(0, 12)
        )

    }, [CurrentPage, Filltershoes])

    useEffect(() => {
        setPageNum(Math.ceil(Filltershoes.length / 12));
    }, [Filltershoes])

    return (

        <div className='ShoesList' >
            <Container ref={myref}>
                {currentData.map((shoe, index) => {
                    return <ShoesCard key={shoe.id} item={shoe} />
                })}
            </Container>
            <PaginationRounded PageNum={pageNum} forwardRef={myref} />
        </div>
    );
};

export default ShoesList;