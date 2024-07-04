import React, { useState, useRef, useEffect } from 'react';
import styles from 'css/homepage/ServicesSummary.module.css'; // We'll define the styles here

const ServicesSummary = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

    const toggleIndex = (index) => {
        if(activeIndex!==-1) setActiveIndex(-1)
        else setActiveIndex(index)
  }
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const columnWidths = () =>{
    const frUnit = containerWidth / 3;
    if (activeIndex === -1) return `${frUnit}px ${frUnit}px ${frUnit}px 0`;
    if (activeIndex === 0) return `${frUnit}px 0 0 ${frUnit * 2}px`;
    if (activeIndex === 1) return `0 ${frUnit}px 0 ${frUnit * 2}px`;
    if (activeIndex === 2) return `0 0 ${frUnit}px ${frUnit * 2}px`;
  }
  
  const images = [
    {
        src: "homepage/CCHhome.png",
        title: "Home Cleaning",
        text: "GET YOUR HOME CLEANED"
    },
    {
        src: "homepage/CCHwindow.png",
        title: "Window Cleaning",
        text: "GET YOUR WINDOWS CLEANED"
    },
    {
        src: "homepage/CCHpest.png",
        title: "Pest Cleaning",
        text: "GET YOUR PESTS CLEANED"
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <h2 className={styles.header}>Take your home maintenance to <span className="gradientUnderline">The Next Level</span></h2>
          <div className={styles.imagesContainer} style={{ gridTemplateColumns: columnWidths() }} ref={containerRef}>
                  {images.map((image, index) => (
                  <div className={styles.image}
                  key={index}
                  ><img
                      src={image.src}
                      alt={`Image ${index + 1}`}
                      onClick={() => toggleIndex(index)}
                      className={index === activeIndex ? styles.active : ''}
                  /></div>
                  ))}
                  <div className={styles.text}>
                      <p>{activeIndex!=-1 && images[activeIndex].text}</p>
                  </div>
          </div>
          <div className = {styles.titlesContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Home Cleaning</div>
              <div className="circleButton" onClick={()=>setActiveIndex(0)}>+</div>
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Window Cleaning</div>
              <div className="circleButton" onClick={()=>setActiveIndex(1)}>+</div>
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Pest Control</div>
              <div className="circleButton" onClick={()=>setActiveIndex(2)}>+</div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ServicesSummary;