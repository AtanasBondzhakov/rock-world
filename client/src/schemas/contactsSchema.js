import { object, string } from 'yup';
import { AUTH_FORM_KEYS } from '../constants';

export const contactsSchema = object().shape({
    [AUTH_FORM_KEYS.Username]: string().min(3, 'Username should be at least 3 characters long').required('Username is required'),
    [AUTH_FORM_KEYS.Email]: string().email('Invalid email format').required('Email is required'),
    [AUTH_FORM_KEYS.Message]: string().min(10, 'Message should be at least 10 characters long').required('Message is required')
});