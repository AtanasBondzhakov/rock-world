import { Link } from "react-router-dom";

import styles from './LatestAlbumsItem.module.css';

export default function LatestAlbumsItem({
    _id,
    imageUrl
}) {
    return (
        <Link to={`/albums/${_id}/details`} className={styles.group}>
            <img
                src={imageUrl}
                alt="image"
                className={styles.image}
            />
        </Link>
    );
};