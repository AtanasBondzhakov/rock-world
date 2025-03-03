import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ALBUM_FORM_KEYS } from '../../../constants.js';
import styles from './EditAlbum.module.css';
import albumService from '../../../services/albumService.js';
import { formatDateString, parseDateString } from '../../../utils/dateUtil.js';
import { albumSchema } from '../../../schemas/albumSchema.js';
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
};

export default function EditAlbum() {
    const [albumData, setAlbumData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const { albumId } = useParams();
    const navigate = useNavigate();

    const onChange = (e) => {
        setAlbumData(state => {
            return {
                ...state,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const updatedAlbumData = {
            ...albumData,
            released: formatDateString(albumData.released)
        };

        try {
            await albumSchema.validate(albumData, { abortEarly: false });
            await albumService.edit(albumId, updatedAlbumData);

            setErrors({});
            navigate(`/albums/${albumId}/details`);
        } catch (err) {
            const validationErrors = {};

            err?.inner?.forEach(error => {
                validationErrors[error.path] = error.message;
            });

            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const result = await albumService.getOne(albumId);

                setAlbumData({
                    ...result,
                    released: parseDateString(result.released)
                });
            } catch (err) {
                setServerError(err.message);
                console.log(err.message);
            }
        })();
    }, [albumId]);

    return (
        <div className={styles.container}>

            {serverError && <ErrorMessage message={serverError}/>}

            <h1 className={styles.title}>Edit Album</h1>
            <form className={styles.form} onSubmit={handleEdit}>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Title}>Title</label>
                    <input
                        type="text"
                        id={ALBUM_FORM_KEYS.Title}
                        name={[ALBUM_FORM_KEYS.Title]}
                        placeholder="Back in Black"
                        value={albumData.title}
                        onChange={onChange}
                    />

                    {errors[ALBUM_FORM_KEYS.Title] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Title]}</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Band}>Band</label>
                    <input
                        type="text"
                        id={ALBUM_FORM_KEYS.Band}
                        name={[ALBUM_FORM_KEYS.Band]}
                        placeholder="AC/DC"
                        value={albumData[ALBUM_FORM_KEYS.Band]}
                        onChange={onChange}
                    />

                    {errors[ALBUM_FORM_KEYS.Band] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Band]}</div>}
                </div>
                <div className={styles.rowGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Genre}>Genre</label>
                        <input
                            type="text"
                            id={ALBUM_FORM_KEYS.Genre}
                            name={[ALBUM_FORM_KEYS.Genre]}
                            placeholder="Hard rock"
                            value={albumData[ALBUM_FORM_KEYS.Genre]}
                            onChange={onChange}
                        />

                        {errors[ALBUM_FORM_KEYS.Genre] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Genre]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Released}>Released</label>
                        <input
                            type="date"
                            id={ALBUM_FORM_KEYS.Released}
                            name={[ALBUM_FORM_KEYS.Released]}
                            placeholder="25.07.1980"
                            value={albumData[ALBUM_FORM_KEYS.Released]}
                            onChange={onChange}
                        />

                        {errors[ALBUM_FORM_KEYS.Released] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Released]}</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.ImageUrl}>Image URL</label>
                    <input
                        type="url"
                        id={ALBUM_FORM_KEYS.ImageUrl}
                        name={[ALBUM_FORM_KEYS.ImageUrl]}
                        placeholder="http://..."
                        value={albumData[ALBUM_FORM_KEYS.ImageUrl]}
                        onChange={onChange}
                    />

                    {errors[ALBUM_FORM_KEYS.ImageUrl] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.ImageUrl]}</div>}
                </div>
                <div className={styles.rowGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.TrackCount}>Track Count</label>
                        <input
                            type="number"
                            id={ALBUM_FORM_KEYS.TrackCount}
                            name={[ALBUM_FORM_KEYS.TrackCount]}
                            placeholder="10"
                            value={albumData[ALBUM_FORM_KEYS.TrackCount]}
                            onChange={onChange}
                        />

                        {errors[ALBUM_FORM_KEYS.TrackCount] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.TrackCount]}</div>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor={ALBUM_FORM_KEYS.Duration}>Duration</label>
                        <input
                            type="number"
                            id={ALBUM_FORM_KEYS.Duration}
                            name={[ALBUM_FORM_KEYS.Duration]}
                            placeholder="55"
                            value={albumData[ALBUM_FORM_KEYS.Duration]}
                            onChange={onChange}
                        />

                        {errors[ALBUM_FORM_KEYS.Duration] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Duration]}</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor={ALBUM_FORM_KEYS.Description}>Description</label>
                    <textarea
                        id={ALBUM_FORM_KEYS.Description}
                        name={[ALBUM_FORM_KEYS.Description]}
                        placeholder="Some information about..."
                        rows="5"
                        value={albumData[ALBUM_FORM_KEYS.Description]}
                        onChange={onChange}
                    >
                    </textarea>

                    {errors[ALBUM_FORM_KEYS.Description] && <div className={styles.validationError}>{errors[ALBUM_FORM_KEYS.Description]}</div>}
                </div>
                <button type="submit" className={styles.button}>Submit Album</button>
            </form>
        </div>
    );
};