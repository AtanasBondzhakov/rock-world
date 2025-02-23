import { useEffect, useState } from 'react';

import styles from './LatestAlbums.module.css';
import albumService from '../../../services/albumService.js';

import LatestAlbumsCarousel from './latest-albums-carousel/LatestAlbumsCarousel.jsx';
import LatestAlbumsItem from './latest-albums-item/LatestAlbumsItem.jsx';

export default function LatestAlbums() {
    const [latestAlbums, setLatestAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await albumService.getLatest();

            setLatestAlbums(result);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Recently Added Albums</h1>
            </div>
            <div>
                <LatestAlbumsCarousel>
                    {latestAlbums.map(album => {
                        return (
                            <div key={album._id}>
                                <LatestAlbumsItem {...album} />
                            </div>
                        )
                    })}
                </LatestAlbumsCarousel>
            </div>
        </div>
    );
};