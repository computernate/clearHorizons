import React from 'react';
import styles from 'css/homepage/OurServices.module.css'

const OurServicesCard = ({item}) => {

    return (<div className={styles.servicesCard}>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
    </div>)
}

export default OurServicesCard;