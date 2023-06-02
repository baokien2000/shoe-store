import React from 'react';
import { Container } from 'react-bootstrap';
import SkeletonCard from '../Home/SkeletonCard';

const SkeletonList = () => {
    return (
        <div className='ShoesList' >
            <Container >
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </Container>
        </div>
    );
};

export default SkeletonList;