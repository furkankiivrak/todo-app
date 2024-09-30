// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = true; // Giriş kontrolü (yerine gerçek kontrol ekle)

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
