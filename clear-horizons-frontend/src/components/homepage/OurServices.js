import React from 'react';
import styles from 'css/homepage/OurServices.css'
import {NavLink} from 'react-router-dom'
import ourServices1 from 'assets/homepage/our_services_1.jpg'
import ourServices2 from 'assets/homepage/our_services_2.jpg'

const OurServices = () => {
    return (
        <div className="services-container">
            <h1 className="services-heading">Our Services</h1>
            <div className="services-content">
                {/* Window Cleaning Section */}
                <div className="service-item">
                    <img 
                        src={ourServices1}
                        alt="Window Cleaning" 
                        className="service-image"
                    />
                    <h2 className="service-title">Window Cleaning</h2>
                    <p className="service-description">
                        Dirty windows? Let us get you a clearer view with our professional window cleaning service, 
                        ensuring every pane sparkles and shines. Trust our detail-oriented team to deliver pristine 
                        results that enhance your home's beauty and maintain a welcoming atmosphere.
                    </p>
                </div>

                {/* Home Cleaning Section */}
                <div className="service-item">
                    <img 
                        src={ourServices2}
                        alt="Home Cleaning" 
                        className="service-image"
                    />
                    <h2 className="service-title">Home Cleaning</h2>
                    <p className="service-description">
                        Want a freshly cleaned home and your free time back? We deliver a tailored cleaning to fit 
                        your needs and your budget. Our experienced pros deliver a reliable service, ensuring 
                        sparkling results after every cleaning visit.
                    </p>
                </div>
            </div>

            {/* Call-to-Action Button */}
          <div className={styles.quoteButton}>
            <NavLink
                to={'/quote'}
                className="quotelink">
                GET FREE QUOTE
            </NavLink>
          </div>
        </div>
    );
};

export default OurServices;
