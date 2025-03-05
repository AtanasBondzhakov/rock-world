import { object, string } from "yup";

import { ALBUM_FORM_KEYS } from "../constants";

export const searchSchema = object().shape({
    [ALBUM_FORM_KEYS.Search]: string().required('Please enter a search term'),
});