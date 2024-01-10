import React from 'react';

import Button from 'components/general/Button'
import styles from 'css/homepage/SavingsProgram.module.css'

const SavingsProgram = () => {

    return (
        <div className={styles.savingsProgram}>
            <div className={styles.savingsone}>
                <h3>Make sure to sign up for our <span className="highlight-text">Savings Program</span> by clicking here
                </h3>
                <div>
                    <Button>Save Today</Button>
                </div>
            </div>
            <div className={styles.savingstwo}>

            </div>
        </div>
    )
}

export default SavingsProgram;