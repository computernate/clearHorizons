import React from 'react';

import styles from 'css/homepage/Whyus.module.css'
import Button from 'components/general/Button.js'
import WhyusCard from "components/homepage/WhyusCard";

const Whyus = () => {

    return (
        <div className={styles.container}>
            <div className={styles.getEstimate}>
                <p className="head-text">GET YOUR <span className="highlight-text">FREE ESTIMATE</span> HERE</p>
                <Button callback={()=>{}}>Estimate</Button>
            </div>
            <h3>Why <span className="head-text">Choose</span> us?</h3>
            <h4>Honestly, I just had eye surgery and the quality of the video is pretty bad. I can't figure out what it
                says here</h4>


            <div className={styles.whyCards}>
                <WhyusCard
                    icon="fa-award"
                    title="High-Quality Products"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
                <WhyusCard
                    icon="fa-hand-holding-dollar"
                    title="Cost Effective"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
                <WhyusCard
                    icon="fa-people-group"
                    title="High-Quality Products"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
                <WhyusCard
                    icon="fa-hand-sparkles"
                    title="Professional Staff"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
                <WhyusCard
                    icon="fa-thumbs-up"
                    title="6+ Years of Experience"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
                <WhyusCard
                    icon="fa-rocket"
                    title="State of the Art Equipment"
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem,
                    lacinia convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida
                    tortor placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum
                    non diam.
                </WhyusCard>
            </div>
        </div>
    )
}

export default Whyus;