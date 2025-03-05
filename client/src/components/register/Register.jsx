import { useContext } from "react";
import { Link } from "react-router-dom";

import { AUTH_FORM_KEYS, PATHS } from "../../constants";
import styles from './Register.module.css';
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import { registerSchema } from "../../schemas/registerSchema.js";

const initialValues = {
    [AUTH_FORM_KEYS.Username]: '',
    [AUTH_FORM_KEYS.Email]: '',
    [AUTH_FORM_KEYS.Password]: '',
    [AUTH_FORM_KEYS.RePassword]: ''
};

export default function Register() {
    const { handleRegister, registerError } = useContext(AuthContext);

    const { formValues, formErrors, onChange, onSubmit } = useForm(initialValues, handleRegister, registerSchema);

    return (
        <div className={styles.container}>

            <div className={styles.authContainer}>
                <h2 className={styles.authTitle}>Register</h2>

                {registerError && <div className={styles.error}>{registerError}</div>}

                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.Username}>Username</label>
                        <input
                            type="text"
                            id={AUTH_FORM_KEYS.Username}
                            name={AUTH_FORM_KEYS.Username}
                            placeholder='John'
                            value={formValues[AUTH_FORM_KEYS.Username]}
                            onChange={onChange}
                        />

                        {formErrors[AUTH_FORM_KEYS.Username] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Username]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.Email}>Email</label>
                        <input
                            type="text"
                            id={AUTH_FORM_KEYS.Email}
                            name={AUTH_FORM_KEYS.Email}
                            placeholder='john@mail.com'
                            value={formValues[AUTH_FORM_KEYS.Email]}
                            onChange={onChange}
                        />

                        {formErrors[AUTH_FORM_KEYS.Email] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Email]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.Password}>Password</label>
                        <input
                            type="password"
                            id={AUTH_FORM_KEYS.Password}
                            name={AUTH_FORM_KEYS.Password}
                            placeholder='******'
                            value={formValues[AUTH_FORM_KEYS.Password]}
                            onChange={onChange}
                        />

                        {formErrors[AUTH_FORM_KEYS.Password] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Password]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.RePassword}>Repeat Password</label>
                        <input
                            type="password"
                            id={AUTH_FORM_KEYS.RePassword}
                            name={AUTH_FORM_KEYS.RePassword}
                            placeholder='******'
                            value={formValues[AUTH_FORM_KEYS.RePassword]}
                            onChange={onChange}
                        />

                        {formErrors[AUTH_FORM_KEYS.RePassword] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.RePassword]}</div>}
                    </div>
                    <button type="submit" className={styles.button}>Register</button>
                </form>
                <p className={styles.loginLink}>
                    Already have an account? <Link to={PATHS.Login}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};
