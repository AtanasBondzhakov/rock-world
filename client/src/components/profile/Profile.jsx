import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';
import AuthContext from '../../contexts/authContext.jsx';
import { useMyFavorites } from '../../api/favoritesApi.js';
import { useGetProfile } from '../../api/profilesApi.js';

import ProfileFavoriteItem from './profile-favorite-item/ProfileFavoriteItem.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import Spinner from '../spinner/Spinner.jsx';

export default function Profile() {
    const { username, email, userId } = useContext(AuthContext);

    const { myFavorites } = useMyFavorites(userId);
    const { profile, error, loading } = useGetProfile(userId);

    return (
        <div className={styles.wrapper}>
            {loading && <Spinner />}

            <div className={styles.container}>
                {(!loading && error) && <ErrorMessage message={error} />}

                {(!loading && !error) && (
                    <>
                        <div className={styles.info}>
                            <div className={styles.top}>
                                <h2>Account Information</h2>
                                <hr style={{ width: '100%' }} />
                                <div className={styles.names}>
                                    <div className={styles.username}>
                                        <span>Username:</span>
                                        <p>{username}</p>
                                    </div>
                                    <div className={styles.email}>
                                        <span>Email:</span>
                                        <p>{email}</p>
                                    </div>
                                    <div className={styles.email}>
                                        <span>First name:</span>
                                        <p>{profile?.firstName || 'n/a'}</p>
                                    </div>
                                    <div className={styles.email}>
                                        <span>Last name:</span>
                                        <p>{profile?.lastName || 'n/a'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <span>Bio:</span>
                                <hr />
                                <p>{profile?.bio || 'n/a'}</p>
                            </div>
                            <Link to={`/auth/profile/${userId}/update`}>Edit Profile</Link>
                        </div>
                        <div className={styles.favorites}>
                            <h2>Favorite Albums</h2>
                            <hr style={{ width: '100%' }} />
                            {myFavorites.length > 0
                                ? myFavorites.map(fav => <ProfileFavoriteItem key={fav._id} {...fav.albumData} />)
                                : <h3>There is no albums yet</h3>
                            }
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};