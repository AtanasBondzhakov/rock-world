import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

import styles from './Header.module.css';
import { PATHS } from '../../constants.js';
import logo from '../../../images/logo.png';

import AuthContext from '../../contexts/authContext.jsx';
import SearchForm from '../search/search-form/SearchForm.jsx';
import HeaderLiItem from './header-li-item/HeaderLiItem.jsx';



const navLinks = [
    { path: PATHS.Home, name: "Home", requiresAuth: null },
    { path: PATHS.Albums, name: "Albums", requiresAuth: null },
    { path: PATHS.About, name: "About", requiresAuth: null },
    { path: PATHS.Login, name: "Login", requiresAuth: false },
    { path: PATHS.Register, name: "Register", requiresAuth: false },
    { path: PATHS.AddAlbum, name: "Add-Album", requiresAuth: true },
    { path: PATHS.Profile, name: "Profile", requiresAuth: true },
    { path: PATHS.Contacts, name: "Contacts", requiresAuth: null },
    { path: PATHS.Logout, name: "Logout", requiresAuth: true },
];

export default function Header() {
    const { isAuthenticated, username } = useContext(AuthContext);
    const location = useLocation();

    const [active, setActive] = useState(PATHS.Home);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    const handleMobileMenu = () => {
        setIsMobile(state => !state);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.logoContainer}>
                    <Link to={PATHS.Home}><img src={logo} alt='Logo' className={styles.logo} /></Link>
                    <p>Rock World</p>
                </div>
                <SearchForm />
            </div>

            <div className={styles.nav}>
                <div className={styles.mobile}>

                    <div className={styles.hamburger}>
                        <RxHamburgerMenu className={styles.icon} onClick={handleMobileMenu} />
                    </div>

                    <ul className={`${styles.mobileMenu} ${isMobile ? styles.mobileActive : ''}`}>
                        {navLinks
                            .filter(link =>
                                link.requiresAuth === null ||
                                (isAuthenticated ? link.requiresAuth : link.requiresAuth === false)
                            )
                            .map(link => (
                                <HeaderLiItem key={link.name} path={link.path} name={link.name} />
                            ))
                        }

                        <span>Welcome, {username ? username : 'guest'}</span>
                    </ul>
                </div>

                <div className={styles.items}>

                    <ul className={styles.menu}>

                        {navLinks
                            .filter(link =>
                                link.requiresAuth === null ||
                                (isAuthenticated ? link.requiresAuth : link.requiresAuth === false)
                            )
                            .map(link => (
                                <HeaderLiItem key={link.name} path={link.path} name={link.name} />
                            ))
                        }

                    </ul>

                    <span>Welcome, {username ? username : 'guest'}</span>
                </div>
            </div>
        </div >
    );
};