import React from 'react';
import styles from "css/pages/Staff.module.css";


const Staff = () => {

    const staffData = [
        {
            name:"Keaton Carter",
            img: "/staff/keat.png",
            text: "Keaton founded Clear Horizon 5 years ago. He's currently our CEO"
        },
        {
            name:"Griffin Kartchner",
            img: "/staff/griff.png",
            text: "Griffin is Head of Operations for Clear Horizon Home. "
        },
    ]

    return (
        <div>
            <div className={styles.container}>
                {staffData.map((item)=>(
                    <div className={styles.staffContainer}>
                        <img src={item.img} />
                        <h6>{item.name}</h6>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Staff;