import React, { useState } from 'react';
import styles from 'css/general/Accordion.module.css'



const AccordionItem = ({item}) => {
  const [isOpen, setIsOpen] = useState(false);

    function toggleOpen(){
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.accordionItem} onClick={toggleOpen}>
            <div className={styles.accordionHeader}>
                <h5>{item.header}</h5>
                <i className={`fa-solid fa-chevron-up ${styles.accordionIcon} ${isOpen? styles.accordionIconActive: ''}`}></i>
            </div>
            <div className={`${styles.accordionItemContent} ${isOpen? styles.accordionItemActive: ''}`}>{item.content}</div>
        </div>
    )
}

export default AccordionItem;