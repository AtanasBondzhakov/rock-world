import { useContext, } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './UpdateProfile.module.css';
import { AUTH_FORM_KEYS } from '../../../constants.js';
import useForm from '../../../hooks/useForm.js';
import profileService from '../../../services/profileService.js';
import AuthContext from '../../../contexts/authContext.jsx';

const initialValues = {
    [AUTH_FORM_KEYS.FirstName]: '',
    [AUTH_FORM_KEYS.LastName]: '',
    [AUTH_FORM_KEYS.Bio]: ''
}

export default function UpdateProfile() {
    const { formValues, formErrors, onChange, onSubmit } = useForm(initialValues, handleEditUser);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleEditUser() {
        //TODO error handling
        await profileService.edit(userId, formValues);

        navigate('/auth/profile');
    };

    return (
        <div className={styles.container}>

            <div className={styles.authContainer}>
                <h2 className={styles.authTitle}>Update Profile</h2>

                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.FirstName}>First name</label>
                        <input
                            type="text"
                            id={AUTH_FORM_KEYS.FirstName}
                            name={AUTH_FORM_KEYS.FirstName}
                            placeholder='John'
                            value={formValues[AUTH_FORM_KEYS.FirstName]}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.LastName}>Last name</label>
                        <input
                            type="text"
                            id={AUTH_FORM_KEYS.LastName}
                            name={AUTH_FORM_KEYS.LastName}
                            placeholder='Doe'
                            value={formValues[AUTH_FORM_KEYS.LastName]}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={AUTH_FORM_KEYS.Bio}>Bio</label>
                        <textarea
                            id={AUTH_FORM_KEYS.Bio}
                            name={[AUTH_FORM_KEYS.Bio]}
                            placeholder="Some information about..."
                            rows="5"
                            value={formValues[AUTH_FORM_KEYS.Bio]}
                            onChange={onChange}
                        >
                        </textarea>
                    </div>
                    <button type="submit" className={styles.button}>Update</button>
                </form>
            </div>
        </div>
    );
};