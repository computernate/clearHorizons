import React from 'react';
import styles from 'css/general/Footer.module.css';
import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.footer}>
            <h2>Clear Horizon Home</h2>
              <div className={styles.info}>
                <div className={styles.infoBlock}>
                    <div className={styles.infoHead}>
                        Location
                    </div>
                    <div>123 Demo Street</div>
                    <div>New York, NY 12345</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.infoHead}>
                        Contact
                    </div>
                    <div><a href="mailto:clearhorizons.utah@gmail.com" className={styles.contactEmail}>
                    clearhorizons.utah@gmail.com
                    </a></div>
                    <div className={styles.contactPhone}>(801) 553-2261</div>
                </div>
              </div>
        </div>
        </div>
    );
};

export default Footer;
