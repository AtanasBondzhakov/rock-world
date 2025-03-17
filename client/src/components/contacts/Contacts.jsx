import styles from './Contacts.module.css';

import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export default function Contacts() {
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
                    <form className={styles.contactForm}>

                        <input type="text" name='username' placeholder='Enter your username' id='username' />

                        <input type="email" name='email' placeholder='Enter your email' id='email' />

                        <textarea type="text" name='message' placeholder='Enter your message' id='message' rows={5}></textarea>

                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
