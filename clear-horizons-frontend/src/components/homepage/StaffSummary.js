import React from 'react';
import styles from 'css/homepage/StaffSummary.module.css'
import staff from 'assets/staff/group.jpg'

const StaffSummary = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>A More Personal Staff</h2>
            <img className={styles.image} src={staff} />
            <div className={styles.bottomButton}>
                <div className="gradientButton">+</div>
                <p>Meet the Team</p>
            </div>
        </div>
    )
}

export default StaffSummary;
