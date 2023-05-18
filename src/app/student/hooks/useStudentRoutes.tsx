import {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {IconCertificate, IconGauge} from "@tabler/icons-react";
import {LinkModel} from "@routing/models/links";

export const useStudentRoutes = () => {
    const {pathname} = useLocation();

    const routes: LinkModel[] = useMemo(() => [
        {
            label: "Dashboard",
            path: "/student",
            icon: IconGauge
        },
        {
            label: "Course",
            icon: IconCertificate,
            links: [
                {
                    label: "Details",
                    path: "/student/course"
                },
                {
                    label: "Schedule",
                    path: "/student/course/schedule"
                },
            ]
        }
    ], []);

    return routes;
};