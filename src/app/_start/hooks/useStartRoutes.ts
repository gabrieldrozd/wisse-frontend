import {useLocation} from "react-router-dom";
import {LinkModel} from "@routing/models/links";
import {useMemo} from "react";

export const useStartRoutes = () => {
    const {pathname} = useLocation();

    const routes: LinkModel[] = useMemo(() => [
        {
            label: "Home",
            path: "/",
            active: pathname === "/",
        },
        {
            label: "Enroll",
            path: "/enroll",
            active: pathname === "/enroll",
        },
    ], []);

    return routes;
};