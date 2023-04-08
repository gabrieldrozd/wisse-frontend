import {ReactNode, useEffect} from "react";
import {Role} from "@core/constants/securityTypes";
import {useAuthSlice} from "@store/slices/users/auth/authSlice";
import {useLocation, useNavigate} from "react-router-dom";

export interface ProtectedRouteProps {
    role: Role;
    children: Element | ReactNode;
}

export const RoleProtectedRoute = ({role, children}: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {selectors} = useAuthSlice();
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