import React, { useState, useRef, useEffect }  from 'react';

import styles from 'css/homepage/Whyus.module.css'

const WhyusCard = ({children, icon, title}) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });

        const {current} = domRef;
        observer.observe(current);

        return () => observer.unobserve(current);
    }, []);

    return (
        <div ref={domRef}  className={`${styles.whyCard} ${isVisible ? styles.visible : ''}`}>
            <i className={`fa-solid ${icon}`}></i>
            <h3>{title}</h3>
            <p>{children}</p>
        </div>
    )
}

export default WhyusCard;