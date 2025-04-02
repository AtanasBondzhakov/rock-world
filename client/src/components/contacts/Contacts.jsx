import { useContext, useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

import styles from './Contacts.module.css';
import { AUTH_FORM_KEYS } from '../../constants';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import { contactsSchema } from '../../schemas/contactsSchema';

import Map from '../map/Map';

import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const initialValues = {
    [AUTH_FORM_KEYS.Username]: '',
    [AUTH_FORM_KEYS.Email]: '',
    [AUTH_FORM_KEYS.Message]: ''
}

export default function Contacts() {
    const formRef = useRef();
    const { username, email } = useContext(AuthContext);

    const {
        formValues,
        formErrors,
        updateFormValues,
        onChange,
        onSubmit
    } = useForm(initialValues, handleSendEmail, contactsSchema);
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSendEmail() {
        setLoading(true);
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_USER_ID
            );
        } catch (err) {
            setError('Your message was not sent. Try again later');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            updateFormValues({
                [AUTH_FORM_KEYS.Username]: username || '',
                [AUTH_FORM_KEYS.Email]: email || ''
            })
        })();
    }, [username, email, updateFormValues]);

    return (
        <div className={styles.container}>
            <div className={styles.contacts}>
                <div className={styles.infoContainer}>
                    <ul className={styles.contactInfo}>
                        <li><MdEmail /> rock-world@yahoo.com</li>
                        <li><FaPhone /> (+359) 888-444-333</li>
                        <li><FaLocationDot /> Plovdiv, Bulgaria</li>
                    </ul>
                </div>
                <div className={styles.formContainer}>
                    <h3>Contact us</h3>

                    {error && <div className={styles.error}>{error}</div>}

                    <form className={styles.contactForm} onSubmit={onSubmit} ref={formRef}>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                name={[AUTH_FORM_KEYS.Username]}
                                placeholder='Enter your username'
                                id={[AUTH_FORM_KEYS.Username]}
                                value={formValues[AUTH_FORM_KEYS.Username]}
                                onChange={onChange}
                            />
                            {formErrors[AUTH_FORM_KEYS.Username] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Username]}</div>}
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name={[AUTH_FORM_KEYS.Email]}
                                placeholder='Enter your email'
                                id={[AUTH_FORM_KEYS.Email]}
                                value={formValues[AUTH_FORM_KEYS.Email]}
                                onChange={onChange}
                            />
                            {formErrors[AUTH_FORM_KEYS.Email] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Email]}</div>}
                        </div>

                        <div className={styles.inputGroup}>
                            <textarea
                                type="text"
                                name={[AUTH_FORM_KEYS.Message]}
                                placeholder='Enter your message'
                                id={[AUTH_FORM_KEYS.Message]}
                                rows={5}
                                value={formValues[AUTH_FORM_KEYS.Message]}
                                onChange={onChange}
                            >
                            </textarea>
                            {formErrors[AUTH_FORM_KEYS.Message] && <div className={styles.validationError}>{formErrors[AUTH_FORM_KEYS.Message]}</div>}
                        </div>

                        <button type='submit' disabled={loading ? 'disabled' : ''}>Send</button>
                    </form>
                </div>
            </div>

            <div className={styles.map}>
                <p>Where are we located?</p>
                <Map />
            </div>
        </div>
    );
};
