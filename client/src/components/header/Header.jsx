import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './Header.module.css';
import { PATHS } from '../../constants.js';
import AuthContext from '../../contexts/authContext.jsx';

export default function Header() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
            <Link to={PATHS.Home}><img src='/images/logo.png' alt='Logo' className={styles.logo} /></Link>
            <p>Rock World</p>
            </div>

            <ul className={styles.items}>
                <li><Link to={PATHS.Home}>Home</Link></li>
                <li><Link to={PATHS.Albums}>Albums</Link></li>

                {isAuthenticated
                    ?
                    <div className={styles.auth}>
                        <li><Link to={PATHS.AddAlbum}>Add Album</Link></li>
                        <li><Link to={PATHS.Logout}>Logout</Link></li>
                    </div>
                    :
                    <div className={styles.guest}>
                        <li><Link to={PATHS.Login}>Login</Link></li>
                        <li><Link to={PATHS.Register}>Register</Link></li>
                        <li><Link to={PATHS.About}>About</Link></li>
                    </div>
                }
            </ul>
        </div >
    );
};