import ChooseUs from "./choose-us/ChooseUs.jsx";
import HeroSection from "./hero-section/HeroSection.jsx";
import LatestAlbums from "./latest-albums/LatestAlbums.jsx";

export default function Home() {
    return (
        <>
            <HeroSection />
            <LatestAlbums />
            <ChooseUs />
        </>
    );
};