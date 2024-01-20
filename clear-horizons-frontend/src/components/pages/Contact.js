import React from 'react';
import styles from "css/pages/Contact.module.css";
import ContactLink from "components/pages/ContactLink"


const Contact = () => {

    return (
        <div>
            <div className={styles.container}>
                <h1>Contact Us</h1>
            </div>
            <div className={styles.iconsWrapper}>
                <ContactLink icon={"fa-brands fa-facebook-f"} text={"@clearHorizons"} url={'http://www.facebook.com'} />
                <ContactLink icon={"fa-brands fa-instagram"} text={"@clearHorizons"} url={'http://www.instagram.com'} />
                <ContactLink icon={"fa-solid fa-phone"} text={"+1 (801) 123-4567"} url={'http://www.facebook.com'} />
                <ContactLink icon={"fa-solid fa-envelope"} text={"clearhorizon.utah@gmail.com"} url={'http://www.facebook.com'} />
            </div>
        </div>
    )
}

export default Contact;