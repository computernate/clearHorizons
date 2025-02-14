import React, {useState} from 'react';
import styles from 'css/general/Header.module.css'
import HamburgerIcon from './HamburgerIcon'
import {NavLink} from 'react-router-dom'
import { motion } from "framer-motion";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const items = [
        {url: '/services', name: 'Services'},
        {url: '/about', name: 'About'},
        {url: '/contact', name: 'Contact'},
    ]

    return (
        <div style={{flex: '0 1 auto'}}>
            <nav className={styles.navbarSpacer}>
                <div className={styles.container}>

                    {/* LOGO */}
                    <NavLink
                        to={'/'}
                        className={styles.title}>
                        Clear Horizon Home
                    </NavLink>
                </div>
            </nav>
            <nav className={styles.navbar}>
                <div className={styles.container}>

                    {/* LOGO */}
                    <NavLink
                        to={'/'}
                        className={styles.title}>
                        Clear Horizon Home
                    </NavLink>

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
                            <li>
                                <NavLink
                                    to={'/quote'}
                                    className={styles.bookLink}>
                                    Book Now
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* HAMBURGER */}
                    <HamburgerIcon className={styles.hamburgerIcon} isOpen={isMenuOpen} toggleMenu={toggleMenu}/>
                </div>
            </nav>


            <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isMenuOpen ? { opacity: 1, y: 0, pointerEvents:'auto' } : { opacity: 0, y: -20, pointerEvents:'none' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`${styles.mobileMenu} absolute top-12 left-0 w-40 bg-white shadow-lg rounded-lg p-4 ${
                    isMenuOpen ? "block" : "hidden"
                    }`}
                >
                <div className={styles.mobileMenuContents}>
                    {items.map(item => (
                        <div key={item.url}>
                            <NavLink
                                onClick={toggleMenu}
                                to={item.url}
                                className={({ isActive }) => isActive ? styles.active : ""}>
                                {item.name}
                            </NavLink>
                        </div>
                    ))}
                    <NavLink
                        to={'/quote'}
                        className={styles.bookLink}>
                        Book Now
                    </NavLink>
                </div>
            </motion.div>
        </div>
    )
}

export default Header;