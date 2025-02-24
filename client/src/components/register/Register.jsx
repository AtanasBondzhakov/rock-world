import { AUTH_FORM_KEYS, PATHS } from "../../constants";
import styles from './Register.module.css';

export default function Register() {
    return (
        <div className={styles.authContainer}>
            <h2 className={styles.authTitle}>Register</h2>
            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor={AUTH_FORM_KEYS.Username}>Username</label>
                    <input
                        type="text"
                        id={AUTH_FORM_KEYS.Username}
                        name={AUTH_FORM_KEYS.Username}
                        placeholder='John'
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={AUTH_FORM_KEYS.Email}>Email</label>
                    <input
                        type="email"
                        id={AUTH_FORM_KEYS.Email}
                        name={AUTH_FORM_KEYS.Email}
                        placeholder='john@mail.com'
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={AUTH_FORM_KEYS.Password}>Password</label>
                    <input
                        type="password"
                        id={AUTH_FORM_KEYS.Password}
                        name={AUTH_FORM_KEYS.Password}
                        placeholder='******'
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={AUTH_FORM_KEYS.RePassword}>Repeat Password</label>
                    <input
                        type="password"
                        id={AUTH_FORM_KEYS.RePassword}
                        name={AUTH_FORM_KEYS.RePassword}
                        placeholder='******'
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <p className={styles.loginLink}>
                Already have an account? <a href={PATHS.Login}>Sign in</a>
            </p>
        </div>
    );
};
