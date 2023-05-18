import {useAdminRoutes} from "./useAdminRoutes";
import {useEffect, useMemo, useState} from "react";

interface Props {
    currentPath: string;
}

export const useAdminHints = ({currentPath}: Props) => {
    const routes = useAdminRoutes();
    const [currentHints, setCurrentHints] = useState<string[]>([]);

    useEffect(() => {
        const currentRoute = routes.find(route => route.path === currentPath);
        if (currentRoute) {
            setCurrentHints(currentRoute.hints!);
        }

        const currentSubRoute = routes.find(route => route.links?.find(subRoute => subRoute.path === currentPath));
        if (currentSubRoute) {
            const currentSubRouteLink = currentSubRoute.links?.find(subRoute => subRoute.path === currentPath);
            if (currentSubRouteLink) {
                setCurrentHints(currentSubRouteLink.hints!);
            }
        }
    }, [routes, currentPath]);

    return currentHints;
};