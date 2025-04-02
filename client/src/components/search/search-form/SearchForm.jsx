import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";

import styles from './SearchForm.module.css';
import useForm from "../../../hooks/useForm";
import { searchSchema } from "../../../schemas/searchSchema";
import { ALBUM_FORM_KEYS } from "../../../constants";

export default function SearchForm() {
    const navigate = useNavigate();

    const handleSearchAlbum = () => {
        navigate(`/search/${formValues[ALBUM_FORM_KEYS.Search]}`)
    };

    const { formValues, formErrors, onChange, onSubmit } = useForm({ search: '' }, handleSearchAlbum, searchSchema);

    useEffect(() => {
        if (formErrors[ALBUM_FORM_KEYS.Search]) {
            formErrors[ALBUM_FORM_KEYS.Search] = '';
        }
    }, [formErrors]);

    return (
        <div className={styles.container}>
            <form className={styles.search} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder='Search for album/band'
                    name={ALBUM_FORM_KEYS.Search}
                    value={formValues[ALBUM_FORM_KEYS.Search]}
                    onChange={onChange}
                />
                <button type='submit'><CiSearch /></button>
            </form >

            {formErrors[ALBUM_FORM_KEYS.Search] && <div className={styles.validationError}>{formErrors[ALBUM_FORM_KEYS.Search]}</div>}
        </div>
    );
};
