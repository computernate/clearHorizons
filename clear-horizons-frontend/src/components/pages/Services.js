import React from 'react'
import styles from 'css/pages/Services.module.css'
import TitleImage from 'components/general/TitleImage'
import Footer from 'components/general/Footer'
import {NavLink} from 'react-router-dom'

import drops from 'assets/pages/drops.jpg'
import bundleAndSave from 'assets/pages/bundleAndSave.jpg'
import mountainClose from 'assets/pages/mountain-close.jpg'
import mountainHome from 'assets/pages/mountain-home.jpg'
import trustedAndScreened from 'assets/pages/trustedAndScreened.jpg'
import screen from 'assets/pages/screen.jpg'
import wfp from 'assets/pages/wfp.jpg'
import cleaningSupplies from 'assets/pages/cleaningSupplies.png'
import homeCleaning from 'assets/pages/home-cleaning.JPG'
import windowCleaning from 'assets/pages/window-cleaning.JPG'
import customizedCleaning from 'assets/pages/customized-cleaning.JPG'
import satisfactionGurantee from 'assets/pages/satisfactionGurantee.jpg'

const Services = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headertop}>Services</div> 
                <div className={styles.headerDetail}>
                    <div>Home Cleaning</div>
                    <div>Window Cleaning</div>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.descriptionText}>Transform your home with our comprehensive range of <span className={styles.orange}>services tailored</span> to meet your needs. Whether you need your windows or home cleaned - or both! - we've got you covered.</div>
            </div>
            <div className={styles.windowWrapper}>
                <div className={styles.window}>
                    <h3>Window Cleaning</h3>
                    <p>Clear Horizon Home brings 5 years of expert window cleaning experience to improve your home's clarity and beauty. Our skilled team uses advanced equipment and eco-friendly products for sparkling results. We clean all building types, from multi-story homes to businesses, ensuring every window, frame, and sill shines. Trust our reliable, detail-oriented service to enhance your property's appearance with safety and care. Experience the Clear Horizon Home difference - a clear view is just a service away.</p>
                </div>
                <div>
                    <img src={windowCleaning} className={styles.sideImage}/>
                </div>
            </div>
            <div className={styles.quadriclesWrapper}>
            <div className={styles.quadricles}>
                <div className={styles.quadricle}>
                    <img src={drops} />
                    <h6>7-Day Rain Guarantee</h6>
                    <p>Worried rain will leave spots on your new, sparkling windows? With every subscription we provide a 7-day rain guarantee at no additional cost!</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={wfp} />
                    <h6>Precision and Care</h6>
                    <p>Our team uses advanced equipment to ensure that every window shines, from the tallest, seemingly out of reach panes, to the below ground sills.</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={satisfactionGurantee} />
                    <h6>100% Satisfaction Guarantee</h6>
                    <p>Why settle for mediocrity? At Clear Horizon we provide a streak free guarantee and won’t leave until you are 100% satisfied with our work!</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={screen} />
                    <h6>The Clear Horizon Difference</h6>
                    <p>Apart from cleaning even the tallest and lowest windows, we hand scrub each screen, ensuring a longer lasting clean and a clearer view. </p>
                </div>
            </div>
            </div>
            <div className={styles.homeWrapper}>
                <div>
                    <img src={homeCleaning} className={styles.sideImage}/>
                </div>
                <div className={styles.home}>
                    <h3>Home Cleaning</h3>
                    <p>At Clear Horizon Home, we understand that a clean home is essential for your well-being and peace of mind. Our professional and experienced cleaning service is dedicated to delivering exceptional results tailored to your needs. By choosing us, you gain not only a spotless living space but also the freedom to focus on what truly matters in your life. Experience the difference of a meticulously cleaned home—trust Clear Horizon Home to exceed your expectations every time.</p>
                </div>
            </div>
            <div className={`${styles.quadriclesWrapper} ${styles.homeQuad}`}>
            <div className={`${styles.quadricles} ${styles.homeQuad}`}>
                <div className={styles.quadricle}>
                    <img src={customizedCleaning} />
                    <h6>Customized Cleaning</h6>
                    <p>Don't settle for a one-size-fits-all approach to cleaning. Let us create a customized cleaning plan tailored to you and your needs.</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={trustedAndScreened} />
                    <h6>Trusted and Screened Cleaning Professionals</h6>
                    <p>Our employees are trained, insured and background checked for peace of mind. We are locally owned and operated.</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={mountainHome} />
                    <h6>100% Satisfaction Guarantee</h6>
                    <p>We are so confident in our professional  service that if for any reason you are unsatisfied with a job, we will come back to your home and make things right. Just notify us within 24 hours of the original cleaning service with the details of the issue and we will take care of the rest!</p>
                </div>
                <div className={styles.quadricle}>
                    <img src={mountainClose} />
                    <h6>Wide Range of Services</h6>
                    <p>We clean bedrooms, bathrooms, kitchens and more! Whether you need a one time clean or are looking for a longer term solution we will be able to help you take your time back!</p>
                </div>
            </div>
            </div>
            <div className={styles.bundle}>
                <svg width="100%" height="217" className={styles.bundleWave}>
                {/* Defining the wave path */}
                <path
                    id="wavePath"
                    fill="transparent"
                    d="M-550,64.214  L-550,64.214 S-183.15,184.214 0,184.214 S366.85,64.214 550,64.214 S916.85,184.214 1100,184.214 S1466.85,64.214 1650,64.214 S2016.85,184.214 2200,184.214"
                />

                {/* Binding text to the path */}
                <text fontSize="40" fill="black">
                    <textPath href="#wavePath">
                    Bundle and Save! Bundle and Save!
                    Bundle and Save! Bundle and Save!
                    Bundle and Save! Bundle and Save!
                    Bundle and Save! Bundle and Save!
                    </textPath>
                </text>
                </svg>
                <div className={styles.bundleContent}>
                    <img src={bundleAndSave} />
                    <div className={styles.bundleText}>
                        <p>Take advantage of both our window and home cleaning services to get exclusive discounts on your service!</p>
                        
                        <NavLink
                            to={'/quote'}
                            className="quotelink">
                            Get 25% Off
                        </NavLink>
                    </div>
                </div>
                <TitleImage imageUrl={cleaningSupplies} titleText="Experience the Clear Horizon Difference Today!" button="GET FREE QUOTE" />
                <Footer />
            </div>
        </div>
    )
}

export default Services