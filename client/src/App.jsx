import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header.jsx"
import { PATHS } from "./constants.js"
import Home from "./components/home/Home.jsx"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path={PATHS.Home} element={<Home />} />
            </Routes>
        </>
    )
}

export default App
