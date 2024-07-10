import React from 'react';
import styles from 'css/pages/Products.module.css'

import TitleImage from '../general/TitleImage'
import {NavLink} from 'react-router-dom'

const ProductHome = () => {
    //usePageTracking();
    return (
        <div className={styles.container}>
            <TitleImage imageUrl = "/product/productHome.png" titleText = "Home Cleaning" />
            <h2>Feel at home</h2>
            <h2>Leave the cleaning to us</h2>
            <div className={styles.home}>
                <p>The last thing you want to do when you get home is clean. Leave the stress behind knowing that we are here to make your home a sanctuary. With a friendly staff, and professional service, we have all the tools to make sure your home is happy and healthy!</p>
                <img src="/product/homeSub.png" />
            </div>

            <NavLink
                to='/schedule'
                className="roundedBlankButton">
                Schedule
            </NavLink>
           </div>
    )
}

export default ProductHome;
