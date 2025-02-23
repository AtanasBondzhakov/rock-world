import Slider from "react-slick";

import styles from './LatestAlbumsCarousel.module.css';

export default function LatestAlbumsCarousel({
    children
}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className={styles.carousel}>
            <Slider className={styles.slickDots} {...settings}>
                {children}
            </Slider>
        </div>
    );
};