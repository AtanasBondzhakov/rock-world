import { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../../../firebase.js';
import { ref, uploadBytes } from "firebase/storage";

import styles from './UpdateProfile.module.css';
import { AUTH_FORM_KEYS } from '../../../constants.js';
import useForm from '../../../hooks/useForm.js';
import profileService from '../../../services/profileService.js';
import AuthContext from '../../../contexts/authContext.jsx';
import { profileSchema } from '../../../schemas/profileSchema.js';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';

const initialValues = {
    [AUTH_FORM_KEYS.FirstName]: '',
    [AUTH_FORM_KEYS.LastName]: '',
    [AUTH_FORM_KEYS.Bio]: ''
};

export default function UpdateProfile() {
    const { formValues, formErrors, onChange, onSubmit } = useForm(initialValues, handleEditUser, profileSchema);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleEditUser() {
        try {
            await profileService.edit(userId, formValues);

            await uploadProfilePicture(image, userId);
            
            navigate('/auth/profile');
        } catch (err) {
            setError(err.message);
        } 
    };

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    };
    
    async function uploadProfilePicture(file, userId) {
        const storageRef = ref(storage, `profile-pictures/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
    }

    return (
        <div className={styles.container}>

            {error && <ErrorMessage message={error} />}

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

                    <div className={styles.inputGroup}>
                        <label htmlFor="image">Profile Picture</label>
                        <input type="file" id="image" name='image' onChange={onChangeImage} />
                    </div>
                    <button type="submit" className={styles.button}>Update</button>
                </form>
            </div>
        </div>
    );
};