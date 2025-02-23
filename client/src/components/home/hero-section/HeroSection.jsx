import styles from './HeroSection.module.css';
import { animated, useSpring } from '@react-spring/web'

export default function HeroSection() {
    const props = useSpring({
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0%)' },
        config: { duration: 500 }
    });
    
    return (
        <div className={styles.container} >
            <animated.div className={styles.heading} style={props}>
                <h1  >Explore the world of rock</h1>
                <p>Your Ultimate Guide to Rock Music</p>
            </animated.div>
        </div>
    );
};