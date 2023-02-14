import React from 'react';
import { Container } from 'react-bootstrap';
import { AiOutlineCopyrightCircle, AiOutlineTwitter, AiOutlineYoutube, AiOutlineInstagram } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const AppFooter = () => {
    return (
        <div className='AppFooter'>
            <Container>

                <div className='Footer_Top'>
                    <div className='Action'>
                        <p>FIND A STORE</p>
                        <p>BECOME A MEMBER</p>
                        <p>SIGN UP FOR EMAIL</p>
                        <p>SEND US FEEDBACK</p>
                    </div>
                    <div className='GetHelp'>
                        <p>GET HELP</p>
                        <p>Order Status</p>
                        <p>Delivery</p>
                        <p>Return</p>
                        <p>Payment Options</p>
                        <p>Contact Us</p>
                    </div>
                    <div className='AboutKStore'>
                        <p>ABOUT KSTORE</p>
                        <p>News</p>
                        <p>Careers</p>
                        <p>Investors</p>
                        <p>Sustainability</p>
                    </div>
                    <div className='Contact'>
                        <button><AiOutlineTwitter /></button>
                        <button><AiOutlineYoutube /></button>
                        <button><AiOutlineInstagram /></button>
                        <button><FiFacebook /></button>
                    </div>
                </div>
                <div className='Footer_Bottom'>
                    <div className='Location'>
                        <span><HiOutlineLocationMarker /> Vietnam</span>
                        <span><AiOutlineCopyrightCircle /> 2023 KStore, Inc. All Rights Reserved </span>
                    </div>
                    <div className='TermAndPolicy'>
                        <span>Guides</span>
                        <span>Terms of Sale</span>
                        <span>Terms of Use</span>
                        <span>KStore Privacy Policy</span>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AppFooter;