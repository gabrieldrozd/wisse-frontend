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
                    "Change selected enrollment with arrow keys",
                ]
            },
            {
                label: "Approved", path: "/admin/enrollments/approved", title: "Approved Enrollments", helpers: [
                    "Select a specific enrollment by clicking on it",
                    "Change selected enrollment with arrow keys",
                ]
            },
            {
                label: "Rejected", path: "/admin/enrollments/rejected", title: "Rejected Enrollments", helpers: [
                    "Select a specific enrollment by clicking on it",
                    "Change selected enrollment with arrow keys",
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