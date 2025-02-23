import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header.jsx"
import { PATHS } from "./constants.js"
import Home from "./components/home/Home.jsx"
import Footer from "./components/footer/Footer.jsx"
import PageNotFound from "./components/page-not-found/PageNotFound.jsx"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path={PATHS.Home} element={<Home />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
