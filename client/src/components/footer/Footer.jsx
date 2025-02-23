import { Link } from "react-router-dom";

import styles from './Footer.module.css';
import { PATHS } from "../../constants.js";

import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className={styles.container}>
            <ul className={styles.contactInfo}>
                <li><MdEmail /> a******b@yahoo.com</li>
                <li><FaPhone /> 0888-444-333</li>
                <li><FaLocationDot /> Springfield, XY 12345</li>
            </ul>
            <div className={styles.infoContainer}>
                <ul className={styles.quickLinks}>
                    <li><Link to={PATHS.Home}>Home</Link></li>
                    <li><Link to={PATHS.About}>About</Link></li>
                    <li><Link to={PATHS.Contacts}>Contacts</Link></li>
                    <li><Link to={PATHS.Albums}>Albums</Link></li>
                </ul>
                <div className={styles.socialMedia}>
                    <Link to="#" target="_blank"><FaGithub /></Link>
                    <Link to="#" target="_blank"><FaLinkedin /></Link>
                    <Link to="#" target="_blank"><FaFacebook /></Link>
                </div>
                <div className={styles.copyright}>
                    <p>&copy; 2025 Rock World. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};