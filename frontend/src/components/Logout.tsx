import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./../services/auth.service";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        navigate("/login");
    }

    return (
        <button onClick={logout} className="mb-4 rounded-lg w-full sm:w-40 px-4 py-2 text-center bg-blue-900 focus:ring-blue-100 text-white">
            Logout
        </button>
    );
};

export default Logout;