import { useContext, useEffect, useState } from "react";

import authService from "../../services/authService.js";
import AuthContext from "../../contexts/authContext.jsx";

import Spinner from "../spinner/Spinner.jsx";

export default function Logout() {
    const { handleLogout } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                await authService.logout();
                handleLogout();
                setLoading(false);
            } catch (err) {
                //TODO error handling
                console.log(err.message);
            }
        })();
    }, []);

    return (
        <>
            {loading && <Spinner />}
        </>
    );
};