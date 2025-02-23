import { useEffect, useState } from 'react';

import styles from './AllAlbums.module.css';
import albumService from '../../../services/albumService.js';

import Spinner from '../../spinner/Spinner.jsx';
import AlbumItem from './album-item/AlbumItem.jsx';

export default function AllAlbums() {
    const [albumsList, setAlbumsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await albumService.getAll();

                setAlbumsList(result);
            } catch (err) {
                //TODO error handling
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return (
        <>
            {loading && <Spinner />}
            <div className={styles.wrapper}>
                {albumsList.length > 0
                    ?
                    <>
                        <h2>Album Collection</h2>
                        <div className={styles.container}>
                            {albumsList.map(album => <AlbumItem key={album._id} {...album} />)}
                        </div>
                    </>
                    : <h2>There is no albums yet.</h2>
                }
            </div>
        </>
    );
};