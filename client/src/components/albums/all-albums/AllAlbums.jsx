import { useEffect, useState } from 'react';

import styles from './AllAlbums.module.css';
import albumService from '../../../services/albumService.js';

import Spinner from '../../spinner/Spinner.jsx';
import AlbumItem from './album-item/AlbumItem.jsx';
import Pagination from '../../pagination/Pagination.jsx';

export default function AllAlbums() {
    const [albumsList, setAlbumsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        (async () => {
            const offset = (currentPage - 1) * pageSize;
            try {
                const result = await albumService.getAll(offset, pageSize + 1);

                setAlbumsList(result.slice(0, pageSize));
                setHasNextPage(result.length > pageSize);

                window.scrollTo({
                    top: 0,
                    left: 0
                })

                setLoading(false);
            } catch (err) {
                //TODO error handling
                console.log(err.message);
            }
        })();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>

            <div className={styles.wrapper}>

                {loading ? <Spinner />
                    : albumsList.length > 0
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