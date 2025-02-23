import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { PATHS } from '../../../constants.js';

export default function Header() {
    return (
        <div className={styles.container}>
            <Link to={PATHS.Home}><img src='/images/logo.png' alt='Logo' className={styles.logo} /></Link>

            <ul className={styles.items}>
                <li><Link to={PATHS.Home}>Home</Link></li>
                <li><Link to={PATHS.Albums}>Albums</Link></li>

                    <div className={styles.auth}>
                        <li><Link to={PATHS.AddAlbum}>Add Album</Link></li>
                        <li><Link to="#">Logout</Link></li>
                    </div>

                    <div className={styles.guest}>
                        <li><Link to={PATHS.Login}>Login</Link></li>
                        <li><Link to={PATHS.Register}>Register</Link></li>
                        <li><Link to={PATHS.About}>About</Link></li>
                    </div>

            </ul>
        </div >
    );
};