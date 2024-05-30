import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import P1 from './Pictures/P1.jpg';
import P2 from './Pictures/P2.jpg';
import P3 from './Pictures/P3.jpg';
const Slider = () => {
    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            loop: true,
            initialSlide: 1,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
            mousewheel: false,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
        });
    }, []);

    const items = [P1, P2, P3];
    return (
        <div className='swiper'>
        <div className="swiper-container">
            <div className="swiper-wrapper">
                {items.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                        <div className="slide-image">
                            <img src={item} alt={`Slide ${index + 1}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div> */}
        </div>
    );
}

export default Slider;
