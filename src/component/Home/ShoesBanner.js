import React from 'react';

import Container from "react-bootstrap/Container";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import pageSlice from '../../redux/Slice/pageSlice';

const ShoesBanner = ({ Banner_Info }) => {
    const dispatch = useDispatch()
    const ToggleButton = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        dispatch(pageSlice.actions.TabsChange(1))
        // setActivePage(1);
    }
    return (
        <div className='ShoesBanner'>
            <Container className={Banner_Info.IsImageLeft ? "Imageleft" : "ImageRight"}>
                <img src={Banner_Info.ImageSrc} />
                <div className='Banner_Info'>
                    <p>{Banner_Info.Header}</p>
                    <h1>{Banner_Info.Title}</h1>
                    <span> {Banner_Info.Text}</span>
                    <div className='BuyNowBtn'>
                        <Link to="/product">
                            <button onClick={ToggleButton}>
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ShoesBanner;