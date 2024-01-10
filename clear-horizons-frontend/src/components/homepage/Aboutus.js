import React from 'react';
import Button from 'components/general/Button'
import styles from 'css/homepage/Aboutus.module.css'

const Aboutus = () => {

    return (
        <div className={styles.aboutUs}>
            <div className={styles.imageStack}>
                <div className={`${styles.imageStack__item} ${styles.imageStack__item__top}`}>
                </div>
                <div className={`${styles.imageStack__item} ${styles.imageStack__item__bottom}`}>
                </div>
            </div>
            <div className={styles.aboutAllInfo}>
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum volutpat lorem, lacinia
                    convallis dolor vestibulum non. Maecenas nec dolor magna. In fermentum lectus gravida tortor
                    placerat, quis aliquam mi euismod. Sed nisi turpis, tincidunt eget gravida ac, interdum non
                    diam.</p>
                <div className={styles.aboutInfo}>
                    <div>
                        <h2>6+</h2>
                        <p>Years Experience</p>
                    </div>
                    <div>
                        <h2>500+</h2>
                        <p>Houses Cleaned</p>
                    </div>
                </div>
                <Button callback={()=>{}}>See more</Button>
            </div>
        </div>
    )
}

export default Aboutus;