import React from 'react';

import styles from 'css/homepage/Whyus.module.css'
import Button from 'components/general/Button.js'
import WhyusCard from "components/homepage/WhyusCard";
import {NavLink} from 'react-router-dom'

const Whyus = () => {

    return (
        <div className={styles.container}>
            <div className={styles.getEstimate}>
                <p className="head-text">GET <span className="highlight-text">SCHEDULED</span> HERE</p>
                    <NavLink
                        to={'/schedule'}
                        style={{textDecoration:'none'}}>
                        <Button callback={()=>{}}>Schedule</Button>
                    </NavLink>
            </div>
            <h3>Why <span className="head-text">Choose</span> us?</h3>
            <h4>Clear Horizon Home Services takes home services to the next level! Clear Horizon takes home services to a new level by
                combining several home services to ensure a premier experience for all aspects. Trust your home with us and you'll understand what true home luxury
                feels like
            </h4>


            <div className={styles.whyCards}>
                <WhyusCard
                    icon="fa-award"
                    title="High-Quality Products"
                >
                    We're all about keeping things crystal clear and most importantly CLEAN! That's why we use high-quality cleaning products that really get the job done. We know how important it is to have a clean and healthy space, so we've picked out the best products that not only do the trick but also keep everyone feeling good. We believe in making spaces not just clean, but also comfy and happy, and that starts with the right products!
                </WhyusCard>
                <WhyusCard
                    icon="fa-hand-holding-dollar"
                    title="Cost Effective"
                >
                    When it comes to prices, we're proud to say we've got the competition beat. Our commitment to providing value for your money means you won't find a better deal elsewhere. We believe in offering the highest quality services at prices that won't break the bank. We've carefully crafted our pricing using intense data science to ensure that our customers not only get top-notch quality but also enjoy cost savings compared to the competition.
                </WhyusCard>
                <WhyusCard
                    icon="fa-hand-sparkles"
                    title="Professional Staff"
                >
                    It’s not every day that you make friends with the service people at your home. At Clear Horizon we strive to make sure every experience is memorable, and that you feel comfortable with our team in your home. We hire friendly professionals that are highly trained and prepared to make your home a sanctuary. 
                </WhyusCard>
                <WhyusCard
                    icon="fa-thumbs-up"
                    title="6+ Years of Experience"
                >
                    Cleaning is not just about wiping surfaces; it requires understanding different materials, surfaces, and the appropriate cleaning methods for each. Our experienced cleaners bring a wealth of knowledge gained from encountering a variety of cleaning challenges over the years. Beyond technical expertise, our experienced team works efficiently, saving time without compromising on quality. Their familiarity with the intricacies of cleaning tasks enables them to deliver a level of cleanliness that goes beyond surface-deep. 
                </WhyusCard>
            </div>
        </div>
    )
}

export default Whyus;