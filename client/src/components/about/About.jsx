import styles from './About.module.css';
import about from '../../../images/about.webp';

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.image}>
                    <img src={about} alt="Guitar and drums" />
                </div>
                <div className={styles.heading}>
                    <p>Welcome to Rock World, the ultimate
                        sanctuary for metalheads and rock fanatics! Discover iconic albums,
                        explore deep tracklists, and unearth hidden gems from the world of heavy metal and hard rock.  </p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>Rock World is the ultimate online destination for heavy metal and rock enthusiasts, offering a vast collection of iconic albums, deep tracklists, and insightful details about legendary bands. Users can explore classic and modern releases, engage with the rock community, and create a personalized wishlist of their favorite albums, making it the perfect hub for every true metalhead.</p>

                <p>With Rock World, users can dive into the history of rock music, discovering influential albums that shaped the genre while adding their own ratings and comments. The platform provides an immersive experience with high-quality album covers, band backgrounds, and an easy-to-navigate interface that ensures seamless browsing for all rock and metal fans.</p>

                <p>Beyond just an album database, Rock World fosters an interactive rock-loving community where users can discuss, share opinions, and recommend hidden gems. Whether you're a lifelong headbanger or new to the genre, the site offers a thrilling way to discover, collect, and celebrate the loudest, hardest, and most electrifying music of all time.</p>
            </div>
        </div>
    );
};
