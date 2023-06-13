import {useAuthApi} from "@api/hooks/useAuthApi";
import {Notify} from "@services/Notify";
import type {ReactNode} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export interface AuthorizedRouteProps {
    children: Element | ReactNode;
}

// TODO: this doesn't work as BE is throwing 500 internal server error
export const AuthorizedRoute = ({children}: AuthorizedRouteProps) => {
    const {queries: {refreshToken}} = useAuthApi();
    const navigate = useNavigate();

    const isAuthorized = async () => {
        return refreshToken().refetch();
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