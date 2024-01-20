import React from 'react';
import styles from 'css/Dashboard/Dashboard.module.css'
import Button from "../general/Button";
import {NavLink} from "react-router-dom";

const Dashboard = ({house}) => {

    return (
        <div className={styles.house}>
            <p className={styles.address}>{house.address}</p>
            {house.setupForWindows && (
                <NavLink
                    to={'/orderWindow/'+house.hID}>
                    <Button>Wash Windows</Button>
                </NavLink>
            )}
            {!house.setupForWindows && (
                <NavLink
                    to={'/setupWindow/'+house.hID}>
                    <Button>Set up for window washing</Button>
                </NavLink>
            )}
            {house.setupForFloors && (
                <NavLink
                    to={'/setupWindow/'+house.hID}>
                    <Button>Vacuum floors</Button>
                </NavLink>
            )}
            {!house.setupForFloors && (
                <NavLink
                    to={'/setupWindow/'+house.hID}>
                    <Button>Set up for vacuuming</Button>
                </NavLink>
            )}
        </div>
    )
}

export default Dashboard;
