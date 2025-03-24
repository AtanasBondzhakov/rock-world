import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';
import AuthContext from '../../contexts/authContext.jsx';
import profileService from '../../services/profileService.js';

import ProfileFavoriteItem from './profile-favorite-item/ProfileFavoriteItem.jsx';
import ErrorMessage from '../error-message/ErrorMessage.jsx';
import Spinner from '../spinner/Spinner.jsx';
import { useMyFavorites } from '../../api/favoritesApi.js';
import { useGetProfile } from '../../api/profilesApi.js';

export default function Profile() {
    // const [favoritesInfo, setFavoritesInfo] = useState([]);
    // const [profile, setProfile] = useState({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    const { username, email, userId } = useContext(AuthContext);

    const { myFavorites } = useMyFavorites(userId);
    const {profile, error, loading } = useGetProfile(userId);
    
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const result = await profileService.get(userId);

    //             setProfile(result);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, [userId]);

    //TODO change profile image and Bio
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
                                        <p>{profile[0]?.firstName || 'n/a'}</p>
                                    </div>
                                    <div className={styles.email}>
                                        <span>Last name:</span>
                                        <p>{profile[0]?.lastName || 'n/a'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <span>Bio:</span>
                                <hr />
                                <p>{profile[0]?.bio || 'n/a'}</p>
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