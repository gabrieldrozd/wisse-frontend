import {ReactNode} from "react";

export interface UnprotectedRouteProps {
    children: Element | ReactNode;
}

export const UnprotectedRoute = ({children}: UnprotectedRouteProps) => {
    return (
        <>
            {children}
        </>
    );
};