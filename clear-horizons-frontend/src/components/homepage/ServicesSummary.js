import React, { useState, useRef, useEffect } from 'react';
import styles from 'css/homepage/ServicesSummary.module.css'; // We'll define the styles here

const ServicesSummary = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const toggleIndex = (index) => {
        if(activeIndex!==-1) setActiveIndex(-1)
        else setActiveIndex(index)
  }
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const columnWidths = () =>{
    let widths = ''
    let frUnit;
    if(!isSmallScreen) frUnit = containerWidth / 3;
    else frUnit = containerHeight / 3;
    if (activeIndex === -1) widths = `${frUnit}px ${frUnit}px ${frUnit}px 0`;
    if (activeIndex === 0) widths = `${frUnit}px 0 0 ${frUnit * 2}px`;
    if (activeIndex === 1) widths = `0 ${frUnit}px 0 ${frUnit * 2}px`;
    if (activeIndex === 2) widths = `0 0 ${frUnit}px ${frUnit * 2}px`;

    if(!isSmallScreen) return {gridTemplateColumns: widths}
    return {gridTemplateRows: widths}

  }
  
  const images = [
    {
        src: "homepage/CCHhome.png",
        title: "Home Cleaning",
        text: "Home clean when you need it, where you need it. Schedule a single service, or sign up for a recurring schedule. Clean only the rooms you need, or the whole house for a whole home experience"
    },
    {
        src: "homepage/CCHwindow.png",
        title: "Window Cleaning",
        text: "High and low. In and out. We've got the skill and equipment to clean all your windows perfectly the first time! Manage a business? We've got commercial cleaning as well"
    },
    {
        src: "homepage/CCHpest.png",
        title: "Pest Cleaning",
        text: "Keep the bugs out, without breaking the bank. We offer an affordable pest control solution that can be bundled with our other services for even more savings!"
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <h2 className={styles.header}>Take your home maintenance to <span className="gradientUnderline">The Next Level</span></h2>
          <div className={styles.imagesContainer} style={ columnWidths() } ref={containerRef}>
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