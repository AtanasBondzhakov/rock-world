import { useContext, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import AuthContext from '../../contexts/authContext.jsx';
import favoriteService from '../../services/favoriteService.js';
import ProfileFavoriteItem from './profile-favorite-item/ProfileFavoriteItem.jsx';

export default function Profile() {
    const [favoritesInfo, setFavoritesInfo] = useState([]);

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

    //TODO change profile image and Bio
    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                <div className={styles.profileImage}>
                    <img src="/images/about.webp" alt="" />
                </div>
                <div className={styles.info}>
                    <div className={styles.top}>
                        <span>Account Information</span>
                        <hr style={{ width: '100%' }}/>
                        <div className={styles.names}>
                            <div className={styles.username}>
                                <span>Username:</span>
                                <p>{username}</p>
                            </div>

                            <div className={styles.email}>
                                <span>Email:</span>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <span>Bio:</span>
                        <hr />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem consequatur, consectetur aliquid praesentium blanditiis ea laboriosam aspernatur error cumque unde et fuga amet excepturi velit voluptatibus iusto consequuntur veniam veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis culpa tenetur dolorem perspiciatis praesentium vel voluptatibus, eveniet ullam error minima! Voluptatem ex sed quaerat voluptatum aliquid accusantium dicta. Libero, facilis.  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quisquam harum, omnis fuga quod ipsa nesciunt libero illo tempora, reiciendis laborum at, aperiam explicabo quae corporis sed officiis necessitatibus fugiat.</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: '100%' }} />
            <div className={styles.favorites}>
                {favoritesInfo.map(fav => <ProfileFavoriteItem key={fav._id} {...fav.albumData} />)}
            </div>
        </div>
    );
};