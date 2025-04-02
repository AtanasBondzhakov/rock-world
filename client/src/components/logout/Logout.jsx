import { useContext, useEffect, useState } from "react";

import styles from './Logout.module.css';
import AuthContext from "../../contexts/authContext.jsx";

import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error-message/ErrorMessage.jsx";
import { useLogout } from "../../api/authApi.js";

export default function Logout() {
    const { handleLogout } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { logout } = useLogout();

    useEffect(() => {
        (async () => {
            try {
                await logout();

            } catch (err) {
                setError({
                    message: err.message
                });
            } finally {
                setLoading(false);
                handleLogout();
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            {loading
                ? <Spinner />
                : <ErrorMessage message={error.message} />
            }
        </div>
    );
};