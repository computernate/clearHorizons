import React from 'react';
import styles from 'css/pages/Products.module.css'

import TitleImage from '../general/TitleImage'
import {NavLink} from 'react-router-dom'

const ProductWindow = () => {
    //usePageTracking();
    return (
        <div className={styles.container}>
            <TitleImage imageUrl = "/product/productWindow.png" titleText = "Window Cleaning" />
            <h2>Relax</h2>
            <h2>We're here to ease your Pane</h2>
            <div className={styles.window}>
                <img src="/product/windowSub.png" />
                <p>Clear Horizon started as a window cleaning company. We have years of experience getting all the gunk off of your panes! We’ve seen it all, and can handle it all. We have a professionally trained staff that is licensed and insured to take the pain out of window panes!</p>
            </div>
            <NavLink
                to='/schedule'
                className="roundedBlankButton">
                Schedule
            </NavLink>
           </div>
    )
}

export default ProductWindow;
