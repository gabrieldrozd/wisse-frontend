import {Outlet} from "react-router-dom";
import {IconGauge, IconMoodPlus,} from "@tabler/icons-react";
import {AdminSystemShell} from "@components/System/Admin/common/AdminSystemShell";
import {LinkModel} from "@core/routing/models/links";

const links: LinkModel[] = [
    {label: "Dashboard", path: "/admin", icon: IconGauge, title: "Admin Dashboard"},
    {
        label: "Enrollments",
        icon: IconMoodPlus,
        links: [
            {label: "Browse", path: "/admin/enrollments", title: "All Enrollments"},
            {label: "Approved", path: "/admin/enrollments/approved", title: "Approved Enrollments"},
            {label: "Rejected", path: "/admin/enrollments/rejected", title: "Rejected Enrollments"},
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