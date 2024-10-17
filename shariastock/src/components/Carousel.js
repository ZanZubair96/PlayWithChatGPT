import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import signup from '../images/Signup.png';
import investing from '../images/Halal investing.png';
import opportunities from '../images/opportunities.png';
import halalway from '../images/Halal way.png';
import portfolio from '../images/Portfolio.png';

const CarouselComponent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5;
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const slides = [
        { src: signup, alt: 'Signup' },
        { src: investing, alt: 'Halal investing' },
        { src: opportunities, alt: 'Opportunities' },
        { src: halalway, alt: 'Halal way' },
        { src: portfolio, alt: 'Portfolio' }
    ];

    return (
        <div className='carousel-container'>
            <Carousel
                selectedItem={currentSlide}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
            >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto', maxHeight: '600px' }} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;