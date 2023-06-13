import type {Role} from "@const/securityTypes";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import type {ReactNode} from "react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export interface ProtectedRouteProps {
    role: Role;
    children: Element | ReactNode;
}

export const RoleProtectedRoute = ({role, children}: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {selectors} = useAuthState();
    const isUserInRole = selectors.isInRole(role);

    useEffect(() => {
        if (!isUserInRole) {
            navigate("/access-denied", {state: {from: location.pathname}});
        }
    }, [isUserInRole]);

    return (
        <>
            {children}
        </>
    );
};