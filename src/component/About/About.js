import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import pageSlice from '../../redux/Slice/pageSlice';

const About = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pageSlice.actions.TabsChange(2));
    }, [dispatch])
    return (
        <div className='About'>
            <Container>
                <img src='./images/ShoeStore.png' alt='ShoeStore.png' />

                <div className='About_Info'>
                    <h1>KStore</h1>
                    <p>Everything we do is rooted in sport. Sport plays an increasingly important role in more and more people’s lives, on and off the field of play. It is central to every culture and society and is core to our health and happiness.</p>
                    <p>Key to our success and the execution of our strategy ‘Own the Game’, are our people and our culture. They bring our identity to life, defined by our purpose, mission, and attitude.</p>
                </div>
            </Container>
        </div>
    );
};

export default About;