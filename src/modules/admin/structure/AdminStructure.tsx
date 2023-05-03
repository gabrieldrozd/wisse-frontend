import {Outlet} from "react-router-dom";
import {IconBallpen, IconBookDownload, IconGauge, IconMoodPlus, IconSchool,} from "@tabler/icons-react";
import {LinkModel} from "@core/routing/models/links";
import {AdminSystemShell} from "@modules.admin/structure/AdminSystemShell";
import {useStudentsContext} from "@modules.admin/components/students/_context/StudentsContext";

export const AdminStructure = () => {
    const studentContext = useStudentsContext();
    const selectedStudent = studentContext.selected.value.externalId ? studentContext.selected.value.externalId : undefined;

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
                    label: "Details", path: `/admin/students/${selectedStudent}`, title: "Specific Student", helpers: [
                        "No hints for this page YET"
                    ]
                }
            ]
        },
        {
            label: "Teachers",
            icon: IconBookDownload,
            links: [
                {
                    label: "Browse", path: "/admin/teachers", title: "All Teachers", helpers: [
                        "Select a specific teacher by clicking on it",
                        "Change selected teacher with arrow keys or with mouse",
                        "Unselect teacher by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected teacher",
                    ]
                },
                {
                    label: "Details", path: `/admin/teachers/${selectedStudent}`, title: "Specific Teacher", helpers: [
                        "No hints for this page YET"
                    ]
                }
            ]
        },
        {
            label: "Tests Templates",
            icon: IconBallpen,
            links: [
                {
                    label: "Browse", path: "/admin/test-templates", title: "All Test Templates", helpers: [
                        "Select a specific teacher by clicking on it",
                        "Change selected teacher with arrow keys or with mouse",
                        "Unselect teacher by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected teacher",
                    ]
                },
                {
                    label: "Create", path: `/admin/test-templates/create`, title: "Create Test Template", helpers: [
                        "No hints for this page YET"
                    ]
                }
            ]
        }
    ];

    return (
        <AdminSystemShell links={links}>
            <Outlet />
        </AdminSystemShell>
    );
};