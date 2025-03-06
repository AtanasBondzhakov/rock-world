import { useEffect, useState } from 'react';

import styles from './AllAlbums.module.css';
import albumService from '../../../services/albumService.js';

import Spinner from '../../spinner/Spinner.jsx';
import AlbumItem from './album-item/AlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';
import ScrollToTop from '../../scroll-to-top/ScrollToTop.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';

export default function AllAlbums() {
    const [albumsList, setAlbumsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            const offset = (currentPage - 1) * pageSize;

            try {
                const result = await albumService.getAll(offset, pageSize + 1);

                setAlbumsList(result.slice(0, pageSize));
                setHasNextPage(result.length > pageSize);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ScrollToTop dependency={currentPage} />

            <div className={styles.wrapper}>
                {loading && <Spinner />}

                {!loading && albumsList.length > 0 && (
                    <>
                        <h2>Album Collection</h2>
                        <div className={styles.container}>
                            {albumsList.map(album => <AlbumItem key={album._id} {...album} />)}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            hasNextPage={hasNextPage}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}

                {!loading && albumsList.length === 0 && !error && (
                    <h2>There is no albums yet.</h2>
                )}

                {!loading && albumsList.length === 0 && error && (
                    <ErrorMessage message={error} />
                )}
            </div>
        </>
    );
};