import { useEffect } from "react";
import ChooseUs from "./choose-us/ChooseUs.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import LatestAlbums from "./latest-albums/LatestAlbums.jsx";

export default function Home() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0
        })
    },[]);

    return (
        <>
            <HeroSection />
            <LatestAlbums />
            <ChooseUs />
        </>
    );
};