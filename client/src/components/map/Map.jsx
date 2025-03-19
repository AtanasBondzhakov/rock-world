import { useEffect, useRef } from "react";
import L from 'leaflet';

import styles from './Map.module.css';

export default function Map() {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = L.map(mapContainerRef.current, { center: [42.1354, 24.7457], zoom: 10 }); // Set initial view (latitude, longitude, zoom level)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([42.1354, 24.7457]).addTo(map);
        marker.openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div
            ref={mapContainerRef}
            className={styles.container}
        ></div>
    );
};
