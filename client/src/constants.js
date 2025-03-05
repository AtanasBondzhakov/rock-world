export const PATHS = {
    Home: '/',
    Register: '/auth/register',
    Login: '/auth/login',
    Logout: '/auth/logout',
    About: '/about',
    Contacts: '/contacts',
    Albums: '/albums',
    AddAlbum: '/albums/add-album',
    DetailsAlbum: '/albums/:albumId/details',
    EditAlbum: '/albums/:albumId/edit',
    Profile: '/auth/profile'
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
    RePassword: 'rePassword'
};