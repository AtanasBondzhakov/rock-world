import { Route, Routes } from "react-router-dom"

import { PATHS } from "./constants.js"
import { AuthProvider } from "./contexts/authContext.jsx"

import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Footer from "./components/footer/Footer.jsx"
import PageNotFound from "./components/page-not-found/PageNotFound.jsx"
import AllAlbums from "./components/albums/all-albums/AllAlbums.jsx"
import Register from "./components/register/Register.jsx"
import Login from "./components/login/Login.jsx"
import Logout from "./components/logout/Logout.jsx"

function App() {
    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route path={PATHS.Home} element={<Home />} />
                <Route path={PATHS.Albums} element={<AllAlbums />} />
                <Route path={PATHS.Register} element={<Register />} />
                <Route path={PATHS.Login} element={<Login />} />
                <Route path={PATHS.Logout} element={<Logout />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />
        </AuthProvider>
    )
}

export default App
