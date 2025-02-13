import React from 'react';
import styles from 'css/homepage/CustomerReviews.module.css'

const OurServicesCard = ({item}) => {

    return (<div className={styles.servicesCard}>
        <p>{item.text}</p>
        <h4>{item.name}</h4>
    </div>)
}

export default OurServicesCard;