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
                    <div>2644 E. Shortcut Drive</div>
                    <div>Draper, UT, 84020</div>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.infoHead}>
                        Contact
                    </div>
                    <div><a href="mailto:clearhorizon.utah@gmail.com" className={styles.contactEmail}>
                    clearhorizon.utah@gmail.com
                    </a></div>
                    <div className={styles.contactPhone}>(801) 935-8787</div>
                </div>
              </div>
        </div>
        </div>
    );
};

export default Footer;
