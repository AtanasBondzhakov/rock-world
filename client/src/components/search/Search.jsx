import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from './Search.module.css'
import albumService from "../../services/albumService";

import Spinner from "../spinner/Spinner";
import AlbumItem from "../albums/all-albums/album-item/AlbumItem";
import ErrorMessage from "../error-message/ErrorMessage";


export default function Search() {
    const [albumsList, setAlbumsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { searchQuery } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const result = await albumService.search(searchQuery);

                setAlbumsList(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [searchQuery]);

    return (
        <div className={styles.wrapper}>
            {loading && <Spinner />}

            {!loading && albumsList.length > 0 && (
                <>
                    <h2>Search Result</h2>
                    <div className={styles.container}>
                        {albumsList.map(album => <AlbumItem key={album._id} {...album} />)}
                    </div>
                </>
            )}

            {!loading && albumsList.length === 0 && !error && (
                <h2>No matching results.</h2>
            )}

            {!loading && albumsList.length === 0 && error && (
                <ErrorMessage message={error} />
            )}
        </div>
    );
};
