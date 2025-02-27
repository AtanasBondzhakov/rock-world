import { object, string, date, number } from 'yup';
import { ALBUM_FORM_KEYS } from '../constants';

export const albumSchema = object().shape({
    [ALBUM_FORM_KEYS.Title]: string().min(2, 'Title should be at least 2 characters long').required('Title is required'),
    [ALBUM_FORM_KEYS.Band]: string().min(2, 'Band should be at least 2 characters long').required('Band is required'),
    [ALBUM_FORM_KEYS.Genre]: string().min(2, 'Genre should be at least 2 characters long').required('Genre is required'),
    [ALBUM_FORM_KEYS.Released]: date('Invalid date format').required('Released date is required').typeError('Released date is required'),
    [ALBUM_FORM_KEYS.ImageUrl]: string().url().required('Image URL is required'),
    [ALBUM_FORM_KEYS.Description]: string().min(20, 'Description should be at least 20 characters long').required('Description is required'),
    [ALBUM_FORM_KEYS.TrackCount]: number('Track count should be a number').typeError('Track count is required').positive('Track count should be positive number').integer('Track count should be integer number'),
    [ALBUM_FORM_KEYS.Duration]: number('Duration should be a number').typeError('Duration is required').positive('Duration should be positive number').integer('Duration should be integer number')
});