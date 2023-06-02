import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => {
    return (
        <div className="Card SkeletonCard" style={{ paddingTop: "20px" }}>
            <a>
                <Skeleton />
            </a>

            <div className="Card_Info">
                <a >
                    <Skeleton height={'100%'} />
                </a>
                <Skeleton height={'100%'} />

                <div className="Card_Sale">
                    <Skeleton height={'100%'} />
                </div>
                <p className="Card_Price"><Skeleton height={'100%'} /></p>
                <div className="Card_Button">
                    <Skeleton height={'100%'} width={'80px'} />
                    <Skeleton height={'100%'} width={'35px'} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;