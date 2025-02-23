import { useEffect, useState } from "react";

import styles from './Pagination.module.css';

export default function Pagination({
    length,
    itemsPerPage,
    changeCurrentPageHandler
}) {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const pageCount = Math.ceil(length / itemsPerPage);
        const pageNumbers = [];

        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }

        setPages(pageNumbers);
    }, [length]);

    const pageClickHandler = (page) => {
        changeCurrentPageHandler(page)
    }

    return (
        <div className={styles.pagination}>
            {pages.map((el, i) => <button className='button' key={el} onClick={() => pageClickHandler(el)}>{el}</button>)}
        </div>
    );
};