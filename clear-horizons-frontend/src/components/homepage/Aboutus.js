import React from 'react';
import styles from 'css/homepage/Aboutus.module.css'

const Aboutus = () => {

    return (
        <div className={styles.aboutUs}>
            <div className={styles.imageStack}>
                <div className={`${styles.imageStack__item} ${styles.imageStack__item__top}`}>
                </div>
                <div className={`${styles.imageStack__item} ${styles.imageStack__item__bottom}`}>
                </div>
            </div>
            <div className={styles.aboutAllInfo}>
                <h2>About Us</h2>
                <p >5 years ago, Keaton Carter founded Clear Horizon Window Cleaning. He started off on the right footing by investing in the 
                    highest quality equipment  and building an experienced team. He has taken that experience gained and began expanding his 
                    services into home cleaning. This is when Clear Horizon Home Services was born. We believe that high quality service trumps 
                    all and that a truly unique customer experience is missing in the service industry. Schedule a quote or cleaning with us 
                    and experience how we can #easeyourpane</p>
                <div className={styles.aboutInfo}>
                    <div>
                        <h2>6+</h2>
                        <p>Years Experience</p>
                    </div>
                    <div>
                        <h2>1000+</h2>
                        <p>Houses Cleaned</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus;