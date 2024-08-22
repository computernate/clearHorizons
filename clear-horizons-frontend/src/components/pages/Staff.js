import React from 'react';
import styles from "css/pages/Staff.module.css";
// import ScheduleHover from 'components/general/ScheduleHover';


const Staff = () => {

    const staffData = [
        {
            name:"Keaton Carter",
            img: "/staff/keat.JPG",
            text: "Keaton founded Clear Horizon 5 years ago. He's currently our CEO"
        },
        {
            name:"Griffin Kartchner",
            img: "/staff/griff.jpg",
            text: "Griffin is Head of Operations for Clear Horizon Home. "
        },
        {
            name:"Rick",
            img: "/staff/rick.jpg",
            text: "Technician "
        },
        {
            name:"Chamique",
            img: "/staff/chamique.jpg",
            text: "Technician "
        },
    ]

    return (
        <div>
            <div className={styles.container}>
                {staffData.map((item)=>(
                    <div className={styles.staffContainer}>
                        <div className={styles.staffImageContainer}>
                            <img src={item.img} />
                        </div>
                        <h6>{item.name}</h6>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Staff;
