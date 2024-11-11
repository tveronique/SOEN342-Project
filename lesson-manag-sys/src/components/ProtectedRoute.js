import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if necessary

const ProtectedRoute = ({ element, requiredRole, redirectTo, ...rest }) => {
  const { role } = useAuth(); // Get current user role

  if (role !== requiredRole) {
    // Redirect user if they do not have the required role
    return <Navigate to={redirectTo} />;
  }

  // If role matches, render the Route with the element
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
