import React from 'react';
import styles from 'css/general/Footer.module.css';
import {NavLink} from 'react-router-dom'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div>Clear Horizon Home LLC</div>
              <div className={styles.bottomNav}>
                <NavLink
                    to='/'
                    className="link">
                    Home
                </NavLink>
                <NavLink
                    to='/schedule'
                    className="link">
                    Schedule
                </NavLink>
                <NavLink
                    to='/schedule'
                    className="link">
                    Contact
                </NavLink>
              </div>
            <div>801-800-9898</div>
            <div>clearhorizon.utah@gmail.com</div>
            <div>© 2024 Clear Horizon Home LLC  All Rights Reserved</div>
        </div>
    );
};

export default Footer;
