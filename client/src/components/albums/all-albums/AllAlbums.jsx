import { useEffect, useState } from 'react';

import styles from './AllAlbums.module.css';
import albumService from '../../../services/albumService.js';

import Spinner from '../../spinner/Spinner.jsx';
import AlbumItem from './album-item/AlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';

export default function AllAlbums() {
    const [albumsList, setAlbumsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        (async () => {
            const offset = (currentPage - 1) * pageSize;
            try {
                const result = await albumService.getAll(offset, pageSize);
                
                setAlbumsList(result);
                //TODO fix if last items are exactly as pageSize
                setHasNextPage(result.length === pageSize);
            } catch (err) {
                //TODO error handling
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
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

                        <Pagination
                            currentPage={currentPage}
                            hasNextPage={hasNextPage}
                            handlePageChange={handlePageChange}
                        />
                    </>
                    : <h2>There is no albums yet.</h2>
                }
            </div>
        </>
    );
};