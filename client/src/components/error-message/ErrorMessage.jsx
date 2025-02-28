import styles from './ErrorMessage.module.css';

export default function ErrorMessage({
    message
}) {
    return (
        <div className={styles.container}>
            <h3>{message}</h3>
        </div>
    );
};