import React from 'react';
import styles from 'css/homepage/Faq.module.css'

import Accordion from 'components/general/Accordion';



const Faq = () => {

    const accordionItems=[
        {
            'header': 'Are you insured?',
            'content': 'Clear Horizon is licensed, insured, and bonded to ensure we our cleaners and your property are safe!'
        },
        {
            'header': 'Are the cleaning products you use safe?',
            'content': 'Yes! Most of our products are water or vinegar based. We also make sure to only use the highest quality products to ensure a safe environment for our cleaners and for you.'
        },
        {
            'header': 'How do subscriptions work?',
            'content': 'A monthly subscription is a flat monthly fee and unlimited cleanings during the month for a discounted rate!'
        },
        {
            'header': 'How often should I get my windows cleaned?',
            'content': 'Contrary to popular belief, you should clean your windows 2-3 times a year to ensure that hard water doesn’t build up and your seals don’t degrade due to contaminates. Contact us to learn how you can save by scheduling all 3 cleanings at once!'
        }
    ]

    return (
        <div className={styles.faq}>
            <div>
                <h3>FAQs</h3>
                <h4>We have listed down some of our frequently asked <span className="head-text">Questions</span> for
                    your assistance</h4>
            </div>

            <div className={styles.faqWrapper}>

                <Accordion items={accordionItems} />
            </div>
        </div>
    )
}

export default Faq;