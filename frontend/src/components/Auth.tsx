import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

export const Private: React.FC = () => {
    const userAuth = AuthService.getUser();

    return userAuth 
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export const Anonymous: React.FC = () => {
    const userAuth = AuthService.getUser();

    return userAuth
    ? <Navigate to="/" replace />
    : <Outlet />;
};