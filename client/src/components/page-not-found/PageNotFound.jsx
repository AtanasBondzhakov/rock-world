import { Link } from "react-router-dom";
import { useEffect } from "react";

import styles from './PageNotFound.module.css';
import { PATHS } from "../../constants.js";

export default function PageNotFound() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0
        })
    }, []);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>
                Oops! Looks like this page doesn't exist... 😔
            </p>
            <p className={styles.description}>
                The page you're looking for might be lost in the sound. But don't
                worry, the rock goes on!
            </p>
            <Link to={PATHS.Home} className={styles.button}>
                Go Back to Rock Home
            </Link>

        </div>
    );
};