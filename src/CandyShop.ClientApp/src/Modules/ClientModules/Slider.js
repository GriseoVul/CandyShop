import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import P1 from './Pictures/P1.jpg';
import P2 from './Pictures/P2.jpg';
import P3 from './Pictures/P3.jpg';
import P4 from './Pictures/P4.jpg';
import P5 from './Pictures/P5.jpeg';
import P6 from './Pictures/P6.jpg';
import iname from './Pictures/iname.png';

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
            autoHeight: false,
            mousewheel: false,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
        });
    }, []);

    const items = [P1, P2, P3, P4, P5, P6,iname];
    return (
        <div className='swiper'>
        <div className="swiper-container">
            <div className="swiper-wrapper">
                {items.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                        <div className="slide-image">
                            {/* <img src={item} alt={`Slide ${index + 1}`} /> */}
                            <div className="imgSliderPrevBox">
                                <div className="imgSliderPrev">
                                    <img src={item} alt="16 x 9"/>
                                </div>
                            </div>
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
