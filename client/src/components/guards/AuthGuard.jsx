import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../../contexts/authContext.jsx';
import { PATHS } from '../../constants.js';

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={PATHS.Login} />
    }

    return (
        <Outlet />
    );
};