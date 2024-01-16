import React from 'react';
import styles from 'css/general/NumericSelector.module.css'; // Assuming you have styles for the icon

const NumericSelector = ({value, setValue}) => {
    let increase = () => {
        let newValue = value + 1
        setValue(newValue)
    }
    let decrease = () => {
        if(value<=0) return
        let newValue = value - 1
        setValue(newValue)
    }
    return (
        <div className={styles.countOptions}>
            <div className="button" onClick={decrease}>-</div>
            <div>{value}</div>
            <div className="button" onClick={increase}>+</div>
        </div>
    );
};

export default NumericSelector;
