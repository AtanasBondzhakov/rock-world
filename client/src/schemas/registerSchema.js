import { object, string, ref } from 'yup';

import { AUTH_FORM_KEYS } from "../constants.js";

export const registerSchema = object().shape({
    [AUTH_FORM_KEYS.Username]: string().min(3, 'Username should be at least 3 characters long').required('Username is required'),
    [AUTH_FORM_KEYS.Email]: string().email('Invalid email format').required('Email is required'),
    [AUTH_FORM_KEYS.Password]: string().min(5, 'Password should be at least 5 characters long').required('Password is required'),
    [AUTH_FORM_KEYS.RePassword]: string().oneOf([ref(AUTH_FORM_KEYS.Password)], 'Passwords mismatch').required('Repeat password is required')
});