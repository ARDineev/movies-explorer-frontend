import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, redirectPath: link, ...props  }) => {
  return (
    props.isAllowed ? <Component {...props} /> : <Navigate to={link} replace/>
)};

export default ProtectedRouteElement;
