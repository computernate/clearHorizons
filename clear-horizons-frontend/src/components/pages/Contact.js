import React from 'react';
import styles from "css/pages/Contact.module.css";
import ContactLink from "components/pages/ContactLink"
// import ScheduleHover from 'components/general/ScheduleHover';


const Contact = () => {

    return (
        <div>
            <div className={styles.container}>
                <h1>Contact Us</h1>
            </div>
            <div className={styles.iconsWrapper}>
                <ContactLink icon={"fa-brands fa-facebook-f"} text={"@clearHorizons"} url={'https://www.facebook.com/clearhorizonutah'} />
                <ContactLink icon={"fa-brands fa-instagram"} text={"@clearHorizons"} url={'https://www.instagram.com/clearhorizonutah/'} />
                <ContactLink icon={"fa-solid fa-phone"} text={"+1 (801) 800-9898"} url={''} />
                <ContactLink icon={"fa-solid fa-envelope"} text={"clearhorizon.utah@gmail.com"} url={''} />
            </div>
        </div>
    )
}

export default Contact;
