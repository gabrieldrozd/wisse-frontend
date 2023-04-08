import {ReactNode, useEffect} from "react";
import {useAuthSlice} from "@store/slices/users/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {Notify} from "@core/services/Notify";

export interface AuthorizedRouteProps {
    children: Element | ReactNode;
}

// TODO: this doesn't work as BE is throwing 500 internal server error
// TODO: this doesn't work as BE is throwing 500 internal server error
// TODO: this doesn't work as BE is throwing 500 internal server error
// TODO: this doesn't work as BE is throwing 500 internal server error
// TODO: this doesn't work as BE is throwing 500 internal server error
export const AuthorizedRoute = ({children}: AuthorizedRouteProps) => {
    const {actions: {refresh}} = useAuthSlice();
    const navigate = useNavigate();

    const isAuthorized = async () => {
        return refresh();
    };

    useEffect(() => {
        isAuthorized().then(result => {
            if (!result) {
                console.log(result);
                Notify.error("Error", "You are not authorized!");
                navigate("/login");
            }
        });
    }, []);

    return (
        <>
            {children}
        </>
    );
};