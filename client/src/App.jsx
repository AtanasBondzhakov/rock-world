import { Route, Routes } from "react-router-dom"

import { PATHS } from "./constants.js"

import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Footer from "./components/footer/Footer.jsx"
import PageNotFound from "./components/page-not-found/PageNotFound.jsx"
import AllAlbums from "./components/albums/all-albums/AllAlbums.jsx"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path={PATHS.Home} element={<Home />} />
                <Route path={PATHS.Albums} element={<AllAlbums />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
