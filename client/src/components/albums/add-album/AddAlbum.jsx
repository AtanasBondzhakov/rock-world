import { useNavigate } from 'react-router-dom';

import styles from './AddAlbum.module.css';
import { ALBUM_FORM_KEYS, PATHS } from '../../../constants.js';
import useForm from '../../../hooks/useForm.js';
import albumService from '../../../services/albumService.js';
import { albumSchema } from '../../../schemas/albumSchema.js';
import { useState } from 'react';
import ErrorMessage from '../../error-message/ErrorMessage.jsx';

const initialValues = {
    [ALBUM_FORM_KEYS.Title]: '',
    [ALBUM_FORM_KEYS.Band]: '',
    [ALBUM_FORM_KEYS.Genre]: '',
    [ALBUM_FORM_KEYS.Released]: '',
    [ALBUM_FORM_KEYS.ImageUrl]: '',
    [ALBUM_FORM_KEYS.Description]: '',
    [ALBUM_FORM_KEYS.TrackCount]: '',
    [ALBUM_FORM_KEYS.Duration]: '',
}

export default function AddAlbum() {
    const { formValues, formErrors, onChange, onSubmit } = useForm(initialValues, addAlbumHandler, albumSchema);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function addAlbumHandler() {
        try {
            await albumService.add(formValues);

            navigate(PATHS.Albums);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>

            {error && <ErrorMessage message={error} />}

            <h1 className={styles.title}>Add new Album</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Title}>Title</label>
                    <input
                        type="text"
                        id={ALBUM_FORM_KEYS.Title}
                        name={[ALBUM_FORM_KEYS.Title]}
                        placeholder="Back in Black"
                        value={formValues[ALBUM_FORM_KEYS.Title]}
                        onChange={onChange}
                    />

                    {formErrors[ALBUM_FORM_KEYS.Title] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Title]}</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Band}>Band</label>
                    <input
                        type="text"
                        id={ALBUM_FORM_KEYS.Band}
                        name={[ALBUM_FORM_KEYS.Band]}
                        placeholder="AC/DC"
                        value={formValues[ALBUM_FORM_KEYS.Band]}
                        onChange={onChange}
                    />

                    {formErrors[ALBUM_FORM_KEYS.Band] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Band]}</div>}
                </div>
                <div className={styles.rowGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Genre}>Genre</label>
                        <input
                            type="text"
                            id={ALBUM_FORM_KEYS.Genre}
                            name={[ALBUM_FORM_KEYS.Genre]}
                            placeholder="Hard rock"
                            value={formValues[ALBUM_FORM_KEYS.Genre]}
                            onChange={onChange}
                        />

                        {formErrors[ALBUM_FORM_KEYS.Genre] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Genre]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Released}>Released</label>
                        <input
                            type="date"
                            id={ALBUM_FORM_KEYS.Released}
                            name={[ALBUM_FORM_KEYS.Released]}
                            placeholder="25.07.1980"
                            value={formValues[ALBUM_FORM_KEYS.Released]}
                            onChange={onChange}
                        />

                        {formErrors[ALBUM_FORM_KEYS.Released] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Released]}</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.ImageUrl}>Image URL</label>
                    <input
                        type="url"
                        id={ALBUM_FORM_KEYS.ImageUrl}
                        name={[ALBUM_FORM_KEYS.ImageUrl]}
                        placeholder="http://..."
                        value={formValues[ALBUM_FORM_KEYS.ImageUrl]}
                        onChange={onChange}
                    />

                    {formErrors[ALBUM_FORM_KEYS.ImageUrl] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.ImageUrl]}</div>}
                </div>
                <div className={styles.rowGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.TrackCount}>Track Count</label>
                        <input
                            type="number"
                            id={ALBUM_FORM_KEYS.TrackCount}
                            name={[ALBUM_FORM_KEYS.TrackCount]}
                            placeholder="10"
                            value={formValues[ALBUM_FORM_KEYS.TrackCount]}
                            onChange={onChange}
                        />

                        {formErrors[ALBUM_FORM_KEYS.TrackCount] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.TrackCount]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Duration}>Duration</label>
                        <input
                            type="number"
                            id={ALBUM_FORM_KEYS.Duration}
                            name={[ALBUM_FORM_KEYS.Duration]}
                            placeholder="55"
                            value={formValues[ALBUM_FORM_KEYS.Duration]}
                            onChange={onChange}
                        />

                        {formErrors[ALBUM_FORM_KEYS.Duration] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Duration]}</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Description}>Description</label>
                    <textarea
                        id={ALBUM_FORM_KEYS.Description}
                        name={[ALBUM_FORM_KEYS.Description]}
                        placeholder="Some information about..."
                        rows="5"
                        value={formValues[ALBUM_FORM_KEYS.Description]}
                        onChange={onChange}
                    >
                    </textarea>

                    {formErrors[ALBUM_FORM_KEYS.Description] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Description]}</div>}
                </div>
                <button type="submit" className={styles.button}>Add Album</button>
            </form>
        </div>
    );
};
