import { dateFormatter } from '../../../../utils/dateUtil';
import styles from './CommentAlbumItem.module.css';

export default function CommentAlbumItem({
    author,
    _createdOn,
    comment
}) {

    return (
        <div className={styles.container}>
            <span>{author?.email} - {dateFormatter(_createdOn)}</span>
            <p>{comment}</p>
        </div>
    );
};