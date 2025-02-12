import React, {useState, useEffect} from 'react';
import styles from 'css/homepage/CustomerReviews.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomerReviewCard from 'components/homepage/CustomerReviewCard'
import Button from 'components/general/Button'
import {NavLink} from 'react-router-dom'

const OurServices = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [settings, setSettings] = useState({
        dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1,
    });

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        }; 
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      useEffect(() => {
        // Set different settings based on screen width
        if (screenWidth <= 786) {
          setSettings({
            dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1,
          });
        } else {
          setSettings({
            dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1,
          });
        }
      }, [screenWidth]);

    const items = [
        {"id": 1, "img":"/homepage/person_1.jpg", "name": "Lisa Kelly", "text": "Chamique at Clear Horizon Window Cleaning is professional, hardworking and does an amazing job! We will definitely use their services again!"},
        {"id": 2, "img":"/homepage/person_2.jpg",  "name": "Lisa Webster", "text": "They did an amazing job, and very conscientous and professional! I was so impressed with Ali, seriously can't wait for them to come back, clean windows are the best!"},
        {"id": 3, "img":"/homepage/person_3.jpg",  "name": "Kai Miller", "text": "I usually don't write reviews but I can't say enough good about this company! Ali cleaned my windows and did a spectadcular job. He was quick, efficient, and my windows have honestly never been cleaner. I'd recommend this company to anyone."},
        {"id": 4, "img":"/homepage/person_4.jpg",  "name": "Marsha Sheppard", "text": "Excellent job. Meticulous work."},
    ]

    return (<div className={styles.ourServices}>
        <h2>See What Your Neighbors Are Saying</h2>
        <Slider {...settings} className={styles.ourServicesSlider}>
            {items.map(item => (<div key={item.id}>
                <CustomerReviewCard item={item}/>
            </div>))}
        </Slider>
    </div>)
}

export default OurServices;