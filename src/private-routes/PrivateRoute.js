import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? (
        <Outlet/>
      ) : (
        <Navigate to="/login" replace />
      );
};

export default PrivateRoute;