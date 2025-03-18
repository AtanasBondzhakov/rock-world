import { useRef } from 'react';
import emailjs from 'emailjs-com';

import styles from './Contacts.module.css';
import { AUTH_FORM_KEYS, PATHS } from '../../constants';
import useForm from '../../hooks/useForm';

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

    const { formValues, onChange, onSubmit } = useForm(initialValues, handleSendEmail);

    async function handleSendEmail() {
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_USER_ID
            );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.contacts}>
                <div className={styles.infoContainer}>
                    <ul className={styles.contactInfo}>
                        <li><MdEmail /> rock-world@yahoo.com</li>
                        <li><FaPhone /> 0888-444-333</li>
                        <li><FaLocationDot /> Springfield, XY 12345</li>
                    </ul>
                </div>
                <div className={styles.formContainer}>
                    <h3>Send us a message</h3>
                    <form className={styles.contactForm} onSubmit={onSubmit} ref={formRef}>
                        <input
                            type="text"
                            name={[AUTH_FORM_KEYS.Username]}
                            placeholder='Enter your username'
                            id={[AUTH_FORM_KEYS.Username]}
                            value={formValues[AUTH_FORM_KEYS.Username]}
                            onChange={onChange}
                        />
                        <input
                            type="email"
                            name={[AUTH_FORM_KEYS.Email]}
                            placeholder='Enter your email'
                            id={[AUTH_FORM_KEYS.Email]}
                            value={formValues[AUTH_FORM_KEYS.Email]}
                            onChange={onChange}
                        />
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
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
