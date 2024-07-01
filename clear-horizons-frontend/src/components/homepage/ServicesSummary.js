import React, { useState } from 'react';
import styles from 'css/homepage/ServicesSummary.module.css'; // We'll define the styles here

const ServicesSummary = () => {
  const [activeIndex, setActiveIndex] = useState(null);

    const toggleIndex = (index) => {
        if(activeIndex!==null) setActiveIndex(null)
        else setActiveIndex(index)
  }

  const columnWidths = () =>{
    if(activeIndex===null) return "1fr 1fr 1fr 0";
    if(activeIndex===0) return "1fr 0 0 2fr"
    if(activeIndex===1) return "0 1fr 0 2fr"
    if(activeIndex===2) return "0 0 1fr 2fr"
    
  }
  
  const images = [
    {
        src: "temp.png",
        title: "Home Cleaning",
        text: "GET YOUR HOME CLEANED"
    },
    {
        src: "utah_logo.png",
        title: "Window Cleaning",
        text: "GET YOUR WINDOWS CLEANED"
    },
    {
        src: "nav-vector.png",
        title: "Pest Cleaning",
        text: "GET YOUR PESTS CLEANED"
    },
  ]

  return (
    <div className={styles.wrapper}>
        <h2>Take your home maintenance to the next level {activeIndex}</h2>
        <div className={styles.container} style={{gridTemplateColumns:columnWidths()}}>
                {images.map((image, index) => (
                <div className={styles.image}><img
                    key={index}
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    onClick={() => toggleIndex(index)}
                    className={index === activeIndex ? styles.active : ''}
                /></div>
                ))}
                <div className={styles.text}>
                    <p>{activeIndex && images[activeIndex].text}</p>
                </div>
        </div>
    </div>
  );
}

export default ServicesSummary;