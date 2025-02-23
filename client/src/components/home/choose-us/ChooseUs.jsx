import styles from './ChooseUs.module.css';

export default function ChooseUs() {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h2>Unmatched Music Collection</h2>
                <p>We offer an extensive library of timeless rock albums and tracks, ensuring you'll discover both legendary classics and hidden gems that define the genre.</p>
            </div>
            <div className={styles.info}>
                <h2>Exclusive Album Releases</h2>
                <p>Stay up to date with the latest rock album releases. Get detailed insights into your favorite rock albums with tracklists, release dates, album artwork, and background stories behind the music that shaped rock history.</p>
            </div>
            <div className={styles.info}>
                <h2>Eternal Rock Experience</h2>
                <p>Our platform brings you closer to the music you love, allowing you to experience the power and energy of rock albums that transcend time, keeping the spirit of the genre alive.</p>
            </div>
        </div>
    );
};