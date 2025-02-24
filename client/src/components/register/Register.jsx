import { useContext } from "react";

import { AUTH_FORM_KEYS, PATHS } from "../../constants";
import styles from './Register.module.css';
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const initialValues = {
    [AUTH_FORM_KEYS.Username]: '',
    [AUTH_FORM_KEYS.Email]: '',
    [AUTH_FORM_KEYS.Password]: '',
    [AUTH_FORM_KEYS.RePassword]: ''
};

export default function Register() {
    const { handleRegister } = useContext(AuthContext);

    const { formValues, onChange, onSubmit } = useForm(initialValues, handleRegister);

    return (
        <div className={styles.authContainer}>
            <h2 className={styles.authTitle}>Register</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor={AUTH_FORM_KEYS.Username}>Username</label>
                    <input
                        type="text"
                        id={AUTH_FORM_KEYS.Username}
                        name={AUTH_FORM_KEYS.Username}
                        placeholder='John'
                        required
                        value={formValues[AUTH_FORM_KEYS.Username]}
                        onChange={onChange}
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
                        value={formValues[AUTH_FORM_KEYS.Email]}
                        onChange={onChange}
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
                        value={formValues[AUTH_FORM_KEYS.Password]}
                        onChange={onChange}
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
                        value={formValues[AUTH_FORM_KEYS.RePassword]}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Register</button>
            </form>
            <p className={styles.loginLink}>
                Already have an account? <a href={PATHS.Login}>Sign in</a>
            </p>
        </div>
    );
};
