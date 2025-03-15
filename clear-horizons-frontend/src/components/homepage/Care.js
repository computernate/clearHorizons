import React from 'react';
import styles from 'css/homepage/WhyUs.module.css'
import {NavLink} from 'react-router-dom'
import windowVideo from 'assets/homepage/window-video.mp4'

const Care = () => {
    return (
        <div className={styles.careWrapper}>
          <video
            className={styles.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={windowVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.careContent}>
            <h2>Ready to get your home the care it deserves?</h2>
            <p>Contact us today to get a free quote or schedule a service appointment.</p>
            <NavLink to="/quote" className="quotelink">
              Get Free Quote
            </NavLink>
          </div>
        </div>
    )
}

export default Care