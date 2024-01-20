import React from 'react';
import DashboardHouse from 'components/dashboard/DashboardHouse'
import styles from 'css/Dashboard/Dashboard.module.css'

const Dashboard = () => {

    let houses = [
        {
            hID: 1,
            address:'123 street street',
            setupForWindows:true,
            setupForFloors:false
        }
    ]

    return (
        <div className={styles.wrapper}>
            <h2>Houses</h2>
            <div className={styles.houses}>
                {houses.map((item, i) => (
                    <DashboardHouse key={i} house={item} />
                ))}
            </div>
            <h2>Jobs</h2>
        </div>
    )
}

export default Dashboard;