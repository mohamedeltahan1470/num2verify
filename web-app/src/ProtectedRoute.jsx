import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context";

export default function ProtectedRoute({checkType, children}) {
    const {userToken} = useAuth();

    if (checkType == "IsLoggedIn" && userToken) {
        return <Navigate to="/countries" />;
    }

    if (checkType == "IsNotLoggedIn" && !userToken) {
        return <Navigate to="/signin" />;
    }
    return children;
};