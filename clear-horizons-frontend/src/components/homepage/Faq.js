import React from 'react';
import styles from 'css/homepage/Faq.module.css'

import Accordion from 'components/general/Accordion';



const Faq = () => {

    const accordionItems=[
        {
            'header': 'What are the prices of your cleaning services?',
            'content': 'This is the first item\'s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.'
        },
        {
            'header': 'Are the cleaning products you use safe?',
            'content': 'This is the first item\'s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.'
        },
        {
            'header': 'What is your process for cleaning the windows?',
            'content': 'This is the first item\'s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.'
        },
        {
            'header': 'How often should I get my windows cleaned?',
            'content': 'This is the first item\'s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.'
        }
    ]

    return (
        <div className={styles.faq}>
            <div className={styles.faqImg}>
                <div>
                </div>
            </div>

            <div className={styles.faqWrapper}>
                <h3>FAQs</h3>
                <h4>We have listed down some of our frequently asked <span className="head-text">Questions</span> for
                    your assistance</h4>

                <Accordion items={accordionItems} />
            </div>
        </div>
    )
}

export default Faq;