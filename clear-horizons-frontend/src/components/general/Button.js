import React from 'react';
import styles from 'css/general/Button.module.css';

const Button = ({
                    children, className = "", style = 'gradient', active = false, callback, hoverCallback = () => {
    }
                }) => {
    return (
        <div
            className={`${styles.button} ${className} ${(style === 'gradient') ? styles.gradient : ''} ${(style === 'solid') ? styles.solid : ''} ${(active) ? styles.active : ''}`}
            onClick={callback}
            onMouseEnter={hoverCallback}>
            {children}
        </div>
    );
};

export default Button;
