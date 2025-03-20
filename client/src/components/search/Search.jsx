import { useParams } from "react-router-dom";

import styles from './Search.module.css'
import { useSearch } from "../../api/albumsApi.js";

import Spinner from "../spinner/Spinner";
import AlbumItem from "../albums/all-albums/album-item/AlbumItem";
import ErrorMessage from "../error-message/ErrorMessage";

export default function Search() {
    const { searchQuery } = useParams();

    const { searchResult, loading, error } = useSearch(searchQuery);

    return (
        <div className={styles.wrapper}>
            {loading && <Spinner />}

            {!loading && searchResult.length > 0 && (
                <>
                    <h2>Search Result</h2>
                    <div className={styles.container}>
                        {searchResult.map(album => <AlbumItem key={album._id} {...album} />)}
                    </div>
                </>
            )}

            {!loading && searchResult.length === 0 && !error && (
                <h2>No matching results.</h2>
            )}

            {!loading && searchResult.length === 0 && error && (
                <ErrorMessage message={error} />
            )}
        </div>
    );
};
