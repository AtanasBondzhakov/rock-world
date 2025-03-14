import { object, string } from 'yup';

import { AUTH_FORM_KEYS } from "../constants.js";

export const profileSchema = object().shape({
    [AUTH_FORM_KEYS.FirstName]: string().nullable().notRequired().transform(value => value === '' ? null : value).min(3, 'First name should be at least 3 characters long'),
    [AUTH_FORM_KEYS.LastName]: string().nullable().notRequired().transform(value => value === '' ? null : value).min(3, 'Last name should be at least 3 characters long'),
    [AUTH_FORM_KEYS.Bio]: string().nullable().notRequired().transform(value => value === '' ? null : value).min(10, 'Bio should be at least 10 characters long')
});