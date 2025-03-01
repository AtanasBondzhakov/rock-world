import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import styles from './Header.module.css';
import { PATHS } from '../../constants.js';
import AuthContext from '../../contexts/authContext.jsx';

export default function Header() {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    const [active, setActive] = useState(PATHS.Home);

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Link to={PATHS.Home}><img src='/images/logo.png' alt='Logo' className={styles.logo} /></Link>
                <p>Rock World</p>
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
        </div >
    );
};