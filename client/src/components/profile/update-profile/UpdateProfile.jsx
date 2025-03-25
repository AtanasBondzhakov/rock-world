import { useContext, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './UpdateProfile.module.css';
import { AUTH_FORM_KEYS, AUTH_MESSAGES } from '../../../constants.js';
import useForm from '../../../hooks/useForm.js';
import AuthContext from '../../../contexts/authContext.jsx';
import { profileSchema } from '../../../schemas/profileSchema.js';
import { toasterSuccess } from '../../../utils/toaster-messages.js';
import { useEditProfile, useGetProfile } from '../../../api/profilesApi.js';

import ErrorMessage from '../../error-message/ErrorMessage.jsx';
import Spinner from '../../spinner/Spinner.jsx';

const initialValues = {
    [AUTH_FORM_KEYS.FirstName]: '',
    [AUTH_FORM_KEYS.LastName]: '',
    [AUTH_FORM_KEYS.Bio]: ''
};

export default function UpdateProfile() {
    const {
        formValues,
        formErrors,
        onChange,
        onSubmit,
        setFormValues
    } = useForm(initialValues, handleEditUser, profileSchema);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const { editProfile } = useEditProfile();
    const { profile } = useGetProfile(userId);

    async function handleEditUser() {
        setLoading(true);
        try {
            await editProfile(userId, formValues);

            toasterSuccess(AUTH_MESSAGES.UPDATE_PROFILE_SUCCESS);
            navigate('/auth/profile');
        } catch (err) {
            setError({
                message: err.message
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormValues({
            [AUTH_FORM_KEYS.FirstName]: profile.firstName || '',
            [AUTH_FORM_KEYS.LastName]: profile.lastName || '',
            [AUTH_FORM_KEYS.Bio]: profile.bio || '',
        });
    }, [profile, userId]);

    return (
        <div className={styles.container}>

            {error && <ErrorMessage message={error.message} />}

            {loading && <Spinner />}

            {(!loading && !error) && (
                <>
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

                                {formErrors[AUTH_FORM_KEYS.FirstName] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.FirstName]}</div>}
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

                                {formErrors[AUTH_FORM_KEYS.LastName] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.LastName]}</div>}
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

                                {formErrors[AUTH_FORM_KEYS.Bio] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Bio]}</div>}
                            </div>
                            <button type="submit" disabled={loading ? 'disabled' : ''} className={styles.button}>Update</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};