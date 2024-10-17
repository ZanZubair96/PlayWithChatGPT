import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import '../styles/main.css'

const Home = () => {
    return (
        <div>
            <div className='header'>
                <h2 className='header-title'>ShariaStock</h2>
                <div className='header-button'>
                    <Link to="/login"><button className='login'>LOGIN</button></Link>
                    <Link to="/signup"><button className='signup'>SIGNUP</button></Link>
                </div>
            </div>
            <Carousel />
        </div>
    );
};

export default Home;