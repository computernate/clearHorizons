import React from 'react';
import styles from 'css/homepage/Greetings.module.css'
import Button from 'components/general/Button.js'
import {NavLink} from 'react-router-dom'

const Greetings = () => {

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <h3>Greetings from us at</h3>
                <h1>Clear Horizon Home</h1>
                <h4>At Clear Horizons, we are the one-stop solution to all of your home cleaning needs.
                    We offer services that exceed our customers' expectations at a reasonable price.</h4>
                <div className={styles.buttonRow}>
                    <NavLink
                        to={'/contact'}
                        style={{textDecoration:'none'}}>
                        <Button callback={()=>{}}>Contact Us</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Greetings;