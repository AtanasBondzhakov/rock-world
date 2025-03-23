import { object, string } from "yup";

import { ALBUM_FORM_KEYS } from "../constants";

export const commentSchema = object().shape({
    [ALBUM_FORM_KEYS.Comment]: string().min(1, 'Comment cannot be empty')
});