import React from 'react';
import styles from "css/pages/Contact.module.css";

const ContactLink = ({ icon, url, text }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
        <div className={styles.contactBubble}>
          <i className={`${icon} ${styles.icon}`}></i>
        </div>
        <p style={{ marginTop: '10px' }}>{text}</p>
      </a>
    </div>
  );
};

export default ContactLink;