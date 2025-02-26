import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './DetailsAlbum.module.css';
import AuthContext from '../../../contexts/authContext.jsx';
import albumService from '../../../services/albumService.js';

import DetailsAlbumItem from './details-album-item/DetailsAlbumItem.jsx';
import Spinner from '../../spinner/Spinner.jsx';

export default function DetailsAlbum() {
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);

    const { albumId } = useParams();
    const { userId } = useContext(AuthContext);

    const isOwner = userId === album._ownerId;

    useEffect(() => {
        (async () => {
            try {
                const resultAlbum = await albumService.getOne(albumId);

                setAlbum(resultAlbum);
                setLoading(false);
            } catch (err) {
                //TODO trycatch
                console.log(err.message);
            }
        })();
    }, [albumId]);
    return (
        <>
            {loading && <Spinner />}

            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.albumContainer}>
                        <DetailsAlbumItem album={album} isOwner={isOwner} />
                    </div>
                </div>
            </div>
        </>
    );
};