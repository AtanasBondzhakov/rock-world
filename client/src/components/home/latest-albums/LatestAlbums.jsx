import { useEffect, useState } from 'react';

import styles from './LatestAlbums.module.css';
import albumService from '../../../services/albumService.js';

import LatestAlbumsCarousel from './latest-albums-carousel/LatestAlbumsCarousel.jsx';
import LatestAlbumsItem from './latest-albums-item/LatestAlbumsItem.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx'

export default function LatestAlbums() {
    const [latestAlbums, setLatestAlbums] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const result = await albumService.getLatest();

                setLatestAlbums(result);
            } catch (err) {
                const errorMessage = 'Albums are currently unavailable.';
                setError(errorMessage);
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Recently Added Albums</h1>
            </div>
            <div>
                {error
                    ? <div className={styles.content}><ErrorMessage message={error} /></div>
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