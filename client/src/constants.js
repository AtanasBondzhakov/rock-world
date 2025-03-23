export const PATHS = {
    Home: '/',
    Register: '/auth/register',
    Login: '/auth/login',
    Logout: '/auth/logout',
    About: '/about',
    Contacts: '/contacts',
    Albums: '/albums',
    CreateAlbum: '/albums/create-album',
    DetailsAlbum: '/albums/:albumId/details',
    EditAlbum: '/albums/:albumId/edit',
    Profile: '/auth/profile',
    UpdateProfile: '/auth/profile/:userId/update'
};

export const ALBUM_FORM_KEYS = {
    Title: 'title',
    Band: 'band',
    Genre: 'genre',
    Released: 'released',
    ImageUrl: 'imageUrl',
    Description: 'description',
    TrackCount: 'trackCount',
    Duration: 'duration',
    Comment: 'comment',
    Search: 'search'
};

export const AUTH_FORM_KEYS = {
    Username: 'username',
    Email: 'email',
    Password: 'password',
    RePassword: 'rePassword',
    FirstName: 'firstName',
    LastName: 'lastName',
    Bio: 'bio',
    Message: 'message'
};

export const AUTH_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful. Welcome back.',
    REGISTER_SUCCESS: 'Register successful. You are now logged in.',
    LOGOUT_SUCCESS: 'Logout successful.',
    UPDATE_PROFILE_SUCCESS: 'Profile updated successfully'
};

export const ALBUM_MESSAGES = {
    CREATE_SUCCESS: 'Album created successfully.',
    EDIT_SUCCESS: 'Album edited successfully.',
    DELETE_SUCCESS: 'Album deleted successfully.'
};