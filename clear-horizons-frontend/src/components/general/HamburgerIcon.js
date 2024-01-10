import React from 'react';
import styles from 'css/general/HamburgerIcon.module.css'; // Assuming you have styles for the icon

/*
* Summary
This code defines a functional component called HamburgerIcon that renders a hamburger icon.
The icon has three bars that turn into an X can be toggled to open or close a menu
The component receives two props: isOpen and toggleMenu.
When the icon is clicked, the toggleMenu function is called to update the isOpen state.

* Example Usage
<HamburgerIcon isOpen={isMenuOpen} toggleMenu={toggleMenu} />

* Inputs
className (string): The classes to be associated with the icon
isOpen (boolean): Indicates whether the menu is open or closed.
toggleMenu (function): Function to toggle the menu state.

* Flow
The HamburgerIcon component receives the isOpen and toggleMenu props.
When the icon is clicked, the toggleMenu function is called.
The toggleMenu function updates the isOpen state by toggling its value.
The isOpen state is used to conditionally apply the barOpen class to the three bars of the hamburger icon.
The barOpen class changes the appearance of the bars to indicate that the menu is open.

* Outputs
None. The HamburgerIcon component only renders the hamburger icon and handles the click event to toggle the menu state.
* */
const HamburgerIcon = ({className = "", isOpen = false, toggleMenu}) => {
    return (
        <div className={`${styles.hamburgerIcon} ${className}`} onClick={toggleMenu}>
            <div className={`${styles.bar} ${styles.bar1} ${isOpen ? styles.barOpen : ''}`}></div>
            <div className={`${styles.bar} ${styles.bar2} ${isOpen ? styles.barOpen : ''}`}></div>
            <div className={`${styles.bar} ${styles.bar3} ${isOpen ? styles.barOpen : ''}`}></div>
        </div>
    );
};

export default HamburgerIcon;
