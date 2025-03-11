import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';
import AuthContext from '../../contexts/authContext.jsx';
import favoriteService from '../../services/favoriteService.js';
import profileService from '../../services/profileService.js';

import ProfileFavoriteItem from './profile-favorite-item/ProfileFavoriteItem.jsx';

export default function Profile() {
    const [favoritesInfo, setFavoritesInfo] = useState([]);
    const [profile, setProfile] = useState({});

    const { username, email, userId } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const allFavorites = await favoriteService.getAll();
                const myFavorites = allFavorites.filter(fav => fav.userId === userId);

                setFavoritesInfo(myFavorites);
            } catch (err) {
                //TODO
                console.log(err.message);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const result = await profileService.get(userId);

            setProfile(result);
        })();
    }, [userId]);

    //TODO change profile image and Bio
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <div className={styles.profileImage}>
                    <img src="/images/about.webp" alt="" />

                    <Link to={`/auth/profile/${userId}/update`}>Edit Profile</Link>
                </div>
                <div className={styles.info}>
                    <div className={styles.top}>
                        <span>Account Information</span>
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
                                <p>{profile?.firstName}</p>
                            </div>

                            <div className={styles.email}>
                                <span>Last name:</span>
                                <p>{profile?.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <span>Bio:</span>
                        <hr />
                        <p>{profile?.bio}</p>
                    </div>
                </div>
            </div>
            <span>Favorite Albums</span>
            <hr style={{ width: '100%' }} />
            <div className={styles.favorites}>
                {favoritesInfo.length > 0
                    ? favoritesInfo.map(fav => <ProfileFavoriteItem key={fav._id} {...fav.albumData} />)
                    : <h3>There is no albums yet</h3>
                }
            </div>
        </div>
    );
};