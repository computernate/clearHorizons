import React from 'react';
import styles from 'css/general/Accordion.module.css'
import AccordionItem from "components/general/AccordionItem";



const Accordion = ({items}) => {

    return (
        <div className={styles.accordion}>
            {items.map((item, i) => (
                <AccordionItem key={i} item={item} />
            ))}
        </div>
    )
}

export default Accordion;