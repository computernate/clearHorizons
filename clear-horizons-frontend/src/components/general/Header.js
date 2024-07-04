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
        {url: '/staff', name: 'Staff'},
        {url: '/contact', name: 'Contact Us'},
        {url: '/schedule', name: 'Schedule'},
    ]
    const sub_items = [
        {url: '/home-cleaning', name: 'Home'},
        {url: '/window-cleaning', name: 'Window'},
        {url: '/pest-control', name: 'Pest'},
    ]

    return (
        <div style={{flex: '0 1 auto'}}>
            <nav className={styles.navbar}>
                <div className={styles.container}>

                    {/* LOGO */}
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="Clear Horizons"/>
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

                    {/* HAMBURGER */}
                    <HamburgerIcon className={styles.hamburgerIcon} isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
                </div>
            </nav>

            <div className={`${styles.subNavElements} ${isMenuOpen ? styles.navOpen : ''}`}>
                <div className={styles.subNavElementContents}>
                    {sub_items.map(item => (
                        <div key={item.url}>
                            <NavLink
                                to={item.url}
                                className={({ isActive }) => isActive ? styles.active : ""}>
                                {item.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header;