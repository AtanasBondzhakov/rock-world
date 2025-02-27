import dateFormatter from '../../../../utils/dateFormatter.js';
import styles from './CommentAlbumItem.module.css';

export default function CommentAlbumItem({
    email,
    _createdOn,
    comment
}) {

    return (
        <div className={styles.container}>
            <p>{email} - {dateFormatter(_createdOn)}</p>
            <p>{comment}</p>
        </div>
    );
};