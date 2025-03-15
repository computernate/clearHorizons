import React from 'react';
import styles from 'css/homepage/WhyUs.module.css'
import {NavLink} from 'react-router-dom'

const ProductsSummary = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div></div>
                <div>
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>We offer a 100% satisfaction guarantee on all our cleanings- if you’re not satisfied with our service we’ll make it right free of charge.</li>
                        <li>Our team brings years of experience in both the window cleaning and home cleaning industries to each job. </li>
                        <li>We can save you time and money by combining your home and window cleaning services!</li>
                    </ul>
                </div>
            </div>
            <NavLink
                to={'/quote'}
                className="quotelink">
                Get Free Quote
            </NavLink>
        </div>
    )
}

export default ProductsSummary