import { dateFormatter } from '../../../../utils/dateUtil';
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