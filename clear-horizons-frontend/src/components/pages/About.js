import React from 'react';
import styles from "css/pages/about.module.css";
import TitleImage from 'components/general/TitleImage';
import Footer from 'components/general/Footer';
// import ScheduleHover from 'components/general/ScheduleHover';
import mop from 'assets/homepage/mop.png'
import getStarted from 'assets/homepage/get_started.png'


const About = () => {

    return (
        <div>
            <div className={styles.contentWrapper}>
                <div>
                    <div className={styles.text}>
                        <h2>Who we are</h2>
                        <p>At Clear Horizon Home, our locally owned and operated leadership team and staff bring years of industry experience to every cleaning project we undertake. Our team is committed to a customer-first approach, ensuring that your needs and preferences are at the forefront of every service we provide. Our professionals understand the importance of maintaining a pristine environment and are trained to handle a variety of spaces with care and attention to detail. You can rest assured that when you choose us, you are in good hands with a dedicated team focused on delivering exceptional results tailored specifically for you.</p>
                    </div>
                </div>
                <div>
                    <img 
                        src={mop}
                        alt="Mop" 
                        className="service-image"
                    />
                </div>
            </div>
            <TitleImage imageUrl = {getStarted} titleText = "Get Started" subtitle="" button="View Services" />
            <Footer />
        </div>
    )
}

export default About;
