import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
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
import AlbumDetails from "./components/albums/details-album/DetailsAlbum.jsx"
import CreateAlbum from "./components/albums/create-album/CreateAlbum.jsx"
import EditAlbum from "./components/albums/edit-album/EditAlbum.jsx"
import ScrollToTop from "./components/scroll-to-top/ScrollToTop.jsx";
import Search from "./components/search/Search.jsx";
import About from "./components/about/About.jsx";
import Profile from "./components/profile/Profile.jsx";
import UpdateProfile from "./components/profile/update-profile/UpdateProfile.jsx";
import Contacts from "./components/contacts/Contacts.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";

function App() {
    return (
        <AuthProvider>
            <ScrollToTop />

            <Header />

            <Routes>
                <Route path={PATHS.Home} element={<Home />} />
                <Route path={PATHS.Albums} element={<AllAlbums />} />
                <Route path={PATHS.Register} element={<Register />} />
                <Route path={PATHS.Login} element={<Login />} />
                <Route element={<AuthGuard />} >
                    <Route path={PATHS.CreateAlbum} element={<CreateAlbum />} />
                    <Route path={PATHS.EditAlbum} element={<EditAlbum />} />
                    <Route path={PATHS.Profile} element={<Profile />} />
                    <Route path={PATHS.UpdateProfile} element={<UpdateProfile />} />
                    <Route path={PATHS.Logout} element={<Logout />} />
                </Route>
                <Route path={PATHS.DetailsAlbum} element={<AlbumDetails />} />
                <Route path="/search/:searchQuery" element={<Search />} />
                <Route path={PATHS.About} element={<About />} />
                <Route path={PATHS.Contacts} element={<Contacts />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />

            <ToastContainer />
        </AuthProvider >
    )
}

export default App
