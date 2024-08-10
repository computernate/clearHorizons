import React from 'react';
import {NavLink} from 'react-router-dom'
import styles from 'css/general/ScheduleHover.module.css';

const ScheduleHover = () => {
    return (
        <NavLink
            to={'/schedule'}
            className={`${styles.hoverbutton} gradient`}>
            {'Get Scheduled'}
        </NavLink>
    );
};

export default ScheduleHover;
