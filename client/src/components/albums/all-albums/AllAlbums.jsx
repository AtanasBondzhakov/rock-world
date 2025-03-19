import { useState } from 'react';

import styles from './AllAlbums.module.css';
import { useGetAllAlbums } from '../../../api/albumsApi.js';

import Spinner from '../../spinner/Spinner.jsx';
import AlbumItem from './album-item/AlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';
import ScrollToTop from '../../scroll-to-top/ScrollToTop.jsx';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';

export default function AllAlbums() {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const offset = (currentPage - 1) * pageSize;

    const { albums, loading, error, hasNextPage } = useGetAllAlbums(offset, pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ScrollToTop dependency={currentPage} />

            <div className={styles.wrapper}>
                {loading && <Spinner />}

                {!loading && albums.length > 0 && (
                    <>
                        <h2>Album Collection</h2>
                        <div className={styles.container}>
                            {albums.map(album => <AlbumItem key={album._id} {...album} />)}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            hasNextPage={hasNextPage}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}

                {!loading && albums.length === 0 && !error && (
                    <h2>There is no albums yet.</h2>
                )}

                {!loading && albums.length === 0 && error && (
                    <ErrorMessage message={error} />
                )}
            </div>
        </>
    );
};