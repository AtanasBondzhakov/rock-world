import { useContext, useEffect, useState } from "react";

import styles from './Logout.module.css';
import authService from "../../services/authService.js";
import AuthContext from "../../contexts/authContext.jsx";

import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error-message/ErrorMessage.jsx";

export default function Logout() {
    const { handleLogout } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                await authService.logout();

                handleLogout();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            {loading
                ? <Spinner />
                : <ErrorMessage message={error} />
            }
        </div>
    );
};