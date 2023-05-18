import {useEffect, useState} from "react";
import {useAdminRoutes} from "./useAdminRoutes";

interface Props {
    currentPath: string;
}

export const useAdminTitle = ({currentPath}: Props) => {
    const routes = useAdminRoutes();
    const [currentTitle, setCurrentTitle] = useState<string>("");

    useEffect(() => {
        const currentRoute = routes.find(route => route.path === currentPath);
        if (currentRoute) {
            setCurrentTitle(currentRoute.title!);
        }

        const currentSubRoute = routes.find(route => route.links?.find(subRoute => subRoute.path === currentPath));
        if (currentSubRoute) {
            const currentSubRouteLink = currentSubRoute.links?.find(subRoute => subRoute.path === currentPath);
            if (currentSubRouteLink) {
                setCurrentTitle(currentSubRouteLink.title!);
            }
        }
    }, [routes, currentPath]);

    return currentTitle;
};