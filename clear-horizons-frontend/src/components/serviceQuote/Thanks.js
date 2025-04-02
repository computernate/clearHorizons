import React from 'react';
import styles from 'css/ServiceQuote/Thanks.module.css';

const Thanks = () => {

  return (
    <div className={styles.wrapper}>
        <h2>Thank you!</h2>
        <p>Thank you for submitting your service request. Check your email for confirmation, and a 
            representitive will reach out soon to discuss exact times and let you know the next steps!</p>
    </div>
  );
};

export default Thanks;