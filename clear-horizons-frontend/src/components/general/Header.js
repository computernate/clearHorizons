import React, {useState} from 'react';
import styles from 'css/general/Header.module.css'
import HamburgerIcon from './HamburgerIcon'
import {NavLink} from 'react-router-dom'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const items = [
        {url: '/', name: 'Home'},
        {url: '/schedule', name: 'GET SERVICE'},
        {url: '/contact', name: 'Contact Us'},
        //{url: '/dashboard', name: 'Dashboard'},
    ]

    return (
        <div style={{flex: '0 1 auto'}}>
            <nav className={styles.navbar}>
                <div className={styles.container}>

                    {/* LOGO */}
                    <div className={styles.logo}>
                        <img src="/utah_logo.png" alt="Clear Horizons"/>
                    </div>

                    {/* MAIN MENU */}
                    <div className={styles.navElements}>
                        <ul>
                            {items.map(item => (
                                <li key={item.url}>
                                    <NavLink
                                        to={item.url}
                                        className={({ isActive }) => isActive ? styles.active : ""}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* MOBILE MENU */}
                    <div className={`${styles.mobileNavElements} ${isMenuOpen ? styles.navOpen : ''}`}>
                        {items.map(item => (
                            <div key={item.url}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) => isActive ? styles.active : ""}>
                                    {item.name}
                                </NavLink>
                            </div>
                        ))}
                    </div>

                    {/* HAMBURGER */}
                    <HamburgerIcon className={styles.hamburgerIcon} isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
                </div>
            </nav>
        </div>
    )
}

export default Header;