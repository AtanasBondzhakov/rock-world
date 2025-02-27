import styles from './CommentAlbum.module.css';
import useForm from '../../../hooks/useForm.js';
import { ALBUM_FORM_KEYS } from '../../../constants.js';

export default function CommentAlbum({
    handleAddComment
}) {
    const { formValues, onChange, onSubmit } = useForm({ comment: '' }, handleAddComment);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Leave a Comment</h2>
            <div className={styles.addComment}>
                <form onSubmit={onSubmit}>
                    <textarea
                        placeholder="Write a comment..."
                        className={styles.input}
                        rows={5}
                        name={ALBUM_FORM_KEYS.Comment}
                        value={formValues[ALBUM_FORM_KEYS.Comment]}
                        onChange={onChange}
                    ></textarea>
                    <button type="submit" className='button'>Comment</button>
                </form>
            </div>
        </div>
    );
};