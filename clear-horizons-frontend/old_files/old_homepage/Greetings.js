import React from 'react';
import styles from 'css/homepage/Greetings.module.css'
import Button from 'components/general/Button.js'
import {NavLink} from 'react-router-dom'

const Greetings = () => {

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <h1>Clear Horizon Home</h1>
            </div>
        </div>
    )
}

export default Greetings;