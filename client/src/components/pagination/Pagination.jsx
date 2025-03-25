import styles from './Pagination.module.css';

export default function Pagination({
    currentPage,
    hasNextPage,
    handlePageChange
}) {
    return (
        <div className={styles.container}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            <span className={styles.page}>Page {currentPage}</span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
            >
                Next
            </button>
        </div>
    );
};