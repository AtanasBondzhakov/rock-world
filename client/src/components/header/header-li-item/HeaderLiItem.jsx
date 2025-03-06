import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './HeaderLiItem.module.css'
import { PATHS } from '../../../constants.js';

export default function HeaderLiItem({ path, name }) {
    const [active, setActive] = useState(PATHS.Home);

    const location = useLocation();

    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    return (
        <li className={styles.liItem}>
            <Link
                to={path}
                className={active === path ? styles.active : ''}
            >
                {name}
            </Link>
        </li>
    );
};