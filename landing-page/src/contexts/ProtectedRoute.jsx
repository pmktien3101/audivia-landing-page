import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from '../utils/routes';
import useUser from '../hooks/UseUser';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = useUser();

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute; 