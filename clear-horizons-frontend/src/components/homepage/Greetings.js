import React from 'react';
import styles from 'css/homepage/Greetings.module.css'
import Button from 'components/general/Button.js'

const Greetings = () => {

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <h3>Greetings from us at</h3>
                <h1>Clear Horizon</h1>
                <h5>At Clear Horizons, we are the one-stop solution to all of your exterior and interior window cleaning
                    needs.
                    We offer services that exceed our customers' expectations at a reasonable price.</h5>
                <div className={styles.buttonRow}>
                    <Button callback={()=>{}} >Read More</Button>
                    <Button callback={()=>{}}>Contact Us</Button>
                </div>
            </div>
        </div>
    )
}

export default Greetings;