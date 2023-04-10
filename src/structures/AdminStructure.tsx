import {Outlet} from "react-router-dom";
import {IconGauge, IconMoodPlus,} from "@tabler/icons-react";
import {AdminSystemShell} from "@components/System/Admin/common/AdminSystemShell";
import {LinkModel} from "@core/routing/models/links";

const links: LinkModel[] = [
    {
        label: "Dashboard", path: "/admin", icon: IconGauge, title: "Admin Dashboard", helpers: [
            "No hints for this page"
        ]
    },
    {
        label: "Enrollments",
        icon: IconMoodPlus,
        links: [
            {
                label: "Browse", path: "/admin/enrollments", title: "All Enrollments", helpers: [
                    "Select a specific enrollment by clicking on it",
                    "Change selected enrollment with arrow keys or with mouse",
                    "Unselect enrollment by clicking once again on it",
                    "Scroll horizontally to see more columns with arrow keys or with mouse",
                    "Use commands to manage selected enrollment",
                ]
            },
            {
                label: "Approved", path: "/admin/enrollments/approved", title: "Approved Enrollments", helpers: [
                    "Select a specific enrollment by clicking on it",
                    "Change selected enrollment with arrow keys or with mouse",
                    "Unselect enrollment by clicking once again on it",
                    "Scroll horizontally to see more columns with arrow keys or with mouse",
                ]
            },
            {
                label: "Rejected", path: "/admin/enrollments/rejected", title: "Rejected Enrollments", helpers: [
                    "Select a specific enrollment by clicking on it",
                    "Change selected enrollment with arrow keys or with mouse",
                    "Unselect enrollment by clicking once again on it",
                    "Scroll horizontally to see more columns with arrow keys or with mouse",
                ]
            },
        ]
    }
];

export const AdminStructure = () => {
    return (
        <AdminSystemShell links={links}>
            <Outlet />
        </AdminSystemShell>
    );
};