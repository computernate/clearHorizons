import React from 'react';
import styles from 'css/homepage/OurServices.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OurServicesCard from 'components/homepage/OurServicesCard'
import Button from 'components/general/Button'

const OurServices = () => {

    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, // other settings you might need
    };

    const items = [
        {"id": 1, "title": "Title 1", "text": "Text text test text"},
        {"id": 2, "title": "Title 2", "text": "Text text test text"},
        {"id": 3, "title": "Title 3", "text": "Text text test text"},
        {"id": 4, "title": "Title 4", "text": "Text text test text"},
        {"id": 5, "title": "Title 5", "text": "Text text test text"},
        {"id": 6, "title": "Title 6", "text": "Text text test text"},
    ]

    return (<div className={styles.ourServices}>
        <h2>Our Services</h2>
        <Slider {...settings} className={styles.ourServicesSlider}>
            {items.map(item => (<div key={item.id}>
                <OurServicesCard item={item}/>
            </div>))}
        </Slider>
        <Button>GET STARTED</Button>
    </div>)
}

export default OurServices;