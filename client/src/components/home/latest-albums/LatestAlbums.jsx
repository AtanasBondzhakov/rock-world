import styles from './LatestAlbums.module.css';

import { useGetLatestAlbums } from '../../../api/albumsApi.js';

import LatestAlbumsCarousel from './latest-albums-carousel/LatestAlbumsCarousel.jsx';
import LatestAlbumsItem from './latest-albums-item/LatestAlbumsItem.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx'

export default function LatestAlbums() {
    const { latestAlbums, error } = useGetLatestAlbums();

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Recently Added Albums</h1>
            </div>
            <div>
                {error
                    ? <div className={styles.content}><ErrorMessage message={error.message} /></div>
                    : (
                        <LatestAlbumsCarousel>
                            {latestAlbums.map(album => {
                                return (
                                    <div key={album._id}>
                                        <LatestAlbumsItem {...album} />
                                    </div>
                                )
                            })}
                        </LatestAlbumsCarousel>
                    )}
            </div>
        </div>
    );
};