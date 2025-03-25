import { Link } from 'react-router-dom';

import styles from './ProfileFavoriteItem.module.css';
import { useGetOneFavorite } from '../../../api/favoritesApi.js';

export default function ProfileFavoriteItem({
    _id,
    imageUrl,
    title,
    band,
    onRemove,
    userId
}) {
    const { favoriteId } = useGetOneFavorite(_id, userId);

    const removeAlbum = async () => {
        try {
            await onRemove(favoriteId)
        } catch (err) {
            //TODO
        }
    };

    return (
        <div className={styles.container}>
            <Link to={`/albums/${_id}/details`} className={styles.albumCard}>
                <img src={imageUrl} alt="album-cover" />
                <div className={styles.info}>
                    <h2>{title} by {band}</h2>
                </div>
            </Link>

            <button onClick={removeAlbum}>Remove</button>
        </div>
    );
};