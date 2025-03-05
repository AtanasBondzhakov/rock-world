import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

import styles from './Header.module.css';
import { PATHS } from '../../constants.js';

import AuthContext from '../../contexts/authContext.jsx';
import SearchForm from '../search/search-form/SearchForm.jsx';

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
                    <Link to={PATHS.Home}><img src='/images/logo.png' alt='Logo' className={styles.logo} /></Link>
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
                        <li>
                            <Link
                                to={PATHS.Home}
                                className={active === PATHS.Home ? styles.active : ''}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={PATHS.Albums}
                                className={active === PATHS.Albums ? styles.active : ''}
                            >
                                Albums
                            </Link>
                        </li>

                        {isAuthenticated
                            ?
                            <div className={styles.auth}>
                                <li>
                                    <Link
                                        to={PATHS.AddAlbum}
                                        className={active === PATHS.AddAlbum ? styles.active : ''}
                                    >
                                        Add
                                        Album</Link>
                                </li>
                                <li>
                                    <Link
                                        to={PATHS.Profile}
                                        className={active === PATHS.Profile ? styles.active : ''}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={PATHS.Logout}
                                        className={active === PATHS.Logout ? styles.active : ''}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </div>
                            :
                            <div className={styles.guest}>
                                <li>
                                    <Link
                                        to={PATHS.Login}
                                        className={active === PATHS.Login ? styles.active : ''}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={PATHS.Register}
                                        className={active === PATHS.Register ? styles.active : ''}
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={PATHS.About}
                                        className={active === PATHS.About ? styles.active : ''}
                                    >
                                        About
                                    </Link>
                                </li>
                            </div>
                        }
                    </ul>
                </div>

                <ul className={styles.items}>
                    <li>
                        <Link
                            to={PATHS.Home}
                            className={active === PATHS.Home ? styles.active : ''}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={PATHS.Albums}
                            className={active === PATHS.Albums ? styles.active : ''}
                        >
                            Albums
                        </Link>
                    </li>

                    {isAuthenticated
                        ?
                        <div className={styles.auth}>
                            <li>
                                <Link
                                    to={PATHS.AddAlbum}
                                    className={active === PATHS.AddAlbum ? styles.active : ''}
                                >
                                    Add
                                    Album</Link>
                            </li>
                            <li>
                                <Link
                                    to={PATHS.Profile}
                                    className={active === PATHS.Profile ? styles.active : ''}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PATHS.Logout}
                                    className={active === PATHS.Logout ? styles.active : ''}
                                >
                                    Logout
                                </Link>
                            </li>
                        </div>
                        :
                        <div className={styles.guest}>
                            <li>
                                <Link
                                    to={PATHS.Login}
                                    className={active === PATHS.Login ? styles.active : ''}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PATHS.Register}
                                    className={active === PATHS.Register ? styles.active : ''}
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={PATHS.About}
                                    className={active === PATHS.About ? styles.active : ''}
                                >
                                    About
                                </Link>
                            </li>
                        </div>
                    }
                </ul>

                <span>Welcome, {username ? username : 'guest'}</span>
            </div>
        </div >
    );
};