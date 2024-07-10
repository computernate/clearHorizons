import React from 'react';
import styles from 'css/pages/Products.module.css'

import TitleImage from '../general/TitleImage'
import {NavLink} from 'react-router-dom'

const ProductPest = () => {
    //usePageTracking();
    return (
        <div className={styles.container}>
            <TitleImage imageUrl = "/product/productPest.png" titleText = "Pest Control" />
            <h2>The best at pest!</h2>
            <h5><u>Coming soon</u></h5>
            <div className={styles.pest}>
                <p>Not happy with your current pest control solution? Why not package your pest control in with your window and home cleaning? We use industry standard pest solutions to deliver professional grade pest control with the customer centered service you’re used to. </p>
            </div>
            <NavLink
                to='/schedule'
                className="roundedBlankButton">
                Schedule
            </NavLink>
        </div>
    )
}

export default ProductPest;