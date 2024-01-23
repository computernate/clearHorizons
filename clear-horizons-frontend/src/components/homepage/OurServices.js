import React, {useState, useEffect} from 'react';
import styles from 'css/homepage/OurServices.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OurServicesCard from 'components/homepage/OurServicesCard'
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
        {"id": 1, "title": "Bronze", "text": "Choose either our Deep Clean or Standard Clean service for a monthly, bi-weekly, or weekly service and you choose which rooms we clean! To top off your visit we’ll leave you cookies and leave you wafting a comfy ambient scent."},
        {"id": 2, "title": "Silver", "text": "All of the options of the Bronze Tier with a little extra umpf! Enjoy a seasonal ambient scent, and blinds and window sill cleaning. "},
        {"id": 3, "title": "Gold", "text": "“If you ain’t first, your last!” Nothing tops our Gold tier! Our gold tier turns your home into a true sanctuary. With fresh sheets and towels, scheduled air filter replacements, and a MojiLife Fragrance System to keep your home smelling fresh long after leave, your house will be nothing short of the best"},
        {"id": 4, "title": "Interior Window Cleaning", "text": "We’ve developed a cleaner, quicker approach to interior window cleaning. Find out why we will be in and out of your house faster and cleaner than anyone else!"},
        {"id": 5, "title": "Exterior Window Cleaning", "text": "With over 5 years of experience and top of the line equipment, our team goes above and beyond to make sure your windows increase your curb appeal and leave you smiling. "},
        {"id": 6, "title": "Screen repair/replacement", "text": "What’s worse than broken and torn screens? Finally forgive your husband bending that screen and have us fix them! Contact us for a quote to get your screens looking great before Spring!"},
    ]

    return (<div className={styles.ourServices}>
        <h2>Our Services</h2>
        <Slider {...settings} className={styles.ourServicesSlider}>
            {items.map(item => (<div key={item.id}>
                <OurServicesCard item={item}/>
            </div>))}
        </Slider>
        <a href={'https://clienthub.getjobber.com/booking/94678600-b45c-4237-9416-3ab3981f3fd7/'} style={{textDecoration:'none'}}>
            <Button callback={()=>{}}>GET STARTED</Button>
          </a>
    </div>)
}

export default OurServices;