import React from 'react';
import styles from 'css/homepage/WhyUs.module.css'
import {NavLink} from 'react-router-dom'

const Care = () => {
    return (
        <div className={styles.careWrapper}>
            <div>
                <h2>Ready to get your home the care it deserves?</h2>
                <p>Contact us today to get a free quote or schedule a service appointment.</p>
            </div>
            <NavLink
                to={'/quote'}
                className="quotelink">
                Get Free Quote
            </NavLink>
        </div>
    )
}

export default Care