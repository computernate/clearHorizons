import React from 'react';
import styles from 'css/homepage/ProductsSummary.module.css'
import sprayBottle from "assets/homepage/spray-bottle.png"

const ProductsSummary = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div>
                    <h2 className={styles.title}>Better Products for a Better Clean</h2>
                    <ul>
                        <li>Top of the line Water-Fed Pole system</li>
                        <li>Locally sourced equipment and supplies</li>
                        <li>Seasonal pest control solutions</li>
                        <li>Chemical free options</li>
                    </ul>
                </div>
                <img className={styles.image} src={sprayBottle} />
            </div>
        </div>
    )
}

export default ProductsSummary;
