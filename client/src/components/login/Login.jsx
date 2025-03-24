import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';
import { AUTH_FORM_KEYS, PATHS } from '../../constants.js';
import useForm from '../../hooks/useForm.js';
import AuthContext from '../../contexts/authContext.jsx';

const initialValues = {
    [AUTH_FORM_KEYS.Email]: '',
    [AUTH_FORM_KEYS.Password]: ''
};

export default function Login() {
    const { handleLogin, loginError, loading } = useContext(AuthContext);

    const { formValues, onChange, onSubmit } = useForm(initialValues, handleLogin);

    return (
        <div className={styles.container}>

            <div className={styles.authContainer}>
                <h2 className={styles.authTitle}>Login</h2>

                {loginError && <div className={styles.error}>{loginError}</div>}

                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name={AUTH_FORM_KEYS.Email}
                            placeholder='john@mail.com'
                            value={formValues[AUTH_FORM_KEYS.Email]}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name={AUTH_FORM_KEYS.Password}
                            placeholder='******'
                            value={formValues[AUTH_FORM_KEYS.Password]}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" disabled={loading ? 'disabled' : ''} className={styles.button}>Login</button>
                </form>
                <p className={styles.registerLink}>
                    Don't have an account? <Link to={PATHS.Register}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};