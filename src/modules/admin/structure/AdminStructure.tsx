import {Outlet} from "react-router-dom";
import {IconBookDownload, IconGauge, IconMoodPlus, IconSchool,} from "@tabler/icons-react";
import {LinkModel} from "@core/routing/models/links";
import {AdminSystemShell} from "@modules.admin/structure/AdminSystemShell";
import {useStudentsContext} from "@modules.admin/components/students/_context/StudentsContext";

export const AdminStructure = () => {
    const studentContext = useStudentsContext();
    const selectedStudent = studentContext.selected?.value;

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
        },
        {
            label: "Students",
            icon: IconSchool,
            links: [
                {
                    label: "Browse", path: "/admin/students", title: "All Students", helpers: [
                        "Select a specific student by clicking on it",
                        "Change selected student with arrow keys or with mouse",
                        "Unselect student by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected student",
                    ]
                },
                {
                    label: "Details", path: `/admin/students/${selectedStudent?.externalId}`, title: "Specific Student", helpers: [
                        "No hints for this page YET"
                    ]
                }
            ]
        },
        {
            label: "Teachers", path: "/admin/teachers", icon: IconBookDownload, title: "All Teachers", helpers: [
                "No hints for this page YET"
            ]
        },
    ];

    return (
        <AdminSystemShell links={links}>
            <Outlet />
        </AdminSystemShell>
    );
};