import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {LinkModel} from "@routing/models/links";
import {MdDashboard, MdEditDocument, MdHistoryEdu, MdPersonAdd, MdSchool} from "react-icons/md";
import {useStudentsContext} from "@app.admin/context/studentsContext";
import {useTeachersContext} from "@app.admin/context/teachersContext";

export const useAdminRoutes = () => {
    const {pathname} = useLocation();
    const {selected: {value: student}} = useStudentsContext();
    const {selected: {value: teacher}} = useTeachersContext();

    const routes: LinkModel[] = useMemo(() => [
        {
            label: "Dashboard",
            path: "/admin",
            title: "Admin Dashboard",
            icon: MdDashboard,
            active: pathname === "/admin",
            hints: [
                "No hints for this page"
            ]
        },
        {
            label: "Enrollments",
            icon: MdPersonAdd,
            links: [
                {
                    label: "Browse",
                    path: "/admin/enrollments",
                    title: "All Enrollments",
                    active: pathname === "/admin/enrollments",
                    hints: [
                        "Select a specific enrollment by clicking on it",
                        "Change selected enrollment with arrow keys or with mouse",
                        "Unselect enrollment by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected enrollment",
                    ]
                },
                {
                    label: "Approved",
                    path: "/admin/enrollments/approved",
                    title: "Approved Enrollments",
                    active: pathname === "/admin/enrollments/approved",
                    hints: [
                        "Select a specific enrollment by clicking on it",
                        "Change selected enrollment with arrow keys or with mouse",
                        "Unselect enrollment by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                    ]
                },
                {
                    label: "Rejected",
                    path: "/admin/enrollments/rejected",
                    title: "Rejected Enrollments",
                    active: pathname === "/admin/enrollments/rejected",
                    hints: [
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
            icon: MdSchool,
            links: [
                {
                    label: "Browse",
                    path: "/admin/students",
                    title: "All Students",
                    active: pathname === "/admin/students",
                    hints: [
                        "Select a specific student by clicking on it",
                        "Change selected student with arrow keys or with mouse",
                        "Unselect student by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected student",
                    ]
                },
                {
                    label: "Details",
                    path: `/admin/students/${student?.externalId}`,
                    title: "Specific Student",
                    active: pathname === `/admin/students/${student?.externalId}`,
                    hints: [
                        "No hints for this page YET"
                    ]
                }
            ]
        },
        {
            label: "Teachers",
            icon: MdHistoryEdu,
            links: [
                {
                    label: "Browse",
                    path: "/admin/teachers",
                    title: "All Teachers",
                    active: pathname === "/admin/teachers",
                    hints: [
                        "Select a specific teacher by clicking on it",
                        "Change selected teacher with arrow keys or with mouse",
                        "Unselect teacher by clicking once again on it",
                        "Scroll horizontally to see more columns with arrow keys or with mouse",
                        "Use commands to manage selected teacher",
                    ]
                },
                {
                    label: "Details",
                    path: `/admin/teachers/${teacher?.externalId}`,
                    title: "Specific Teacher",
                    active: pathname === `/admin/teachers/${teacher?.externalId}`,
                    hints: [
                        "No hints for this page YET"
                    ]
                }
            ]
        },
        {
            label: "Tests Templates",
            icon: MdEditDocument,
            links: [
                {
                    label: "Browse",
                    path: "/admin/test-templates",
                    title: "All Test Templates",
                    active: pathname === "/admin/test-templates",
                    hints: [
                        "No hints for this page YET",
                    ]
                },
                {
                    label: "Create",
                    path: `/admin/test-templates/create`,
                    title: "Create Test Template",
                    active: pathname === `/admin/test-templates/create`,
                    hints: [
                        "Provide basic information about test template and select language level",
                        "Selected language level will be used to get existing questions",
                        "You can add new questions to test template or select existing ones",
                        "Existing questions won't be editable (grayed out)",
                        "You can remove questions from test template",
                    ]
                }
            ]
        }
    ], [pathname, student.externalId, teacher.externalId]);

    return routes;
};