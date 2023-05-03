import {StudentSystemShell} from "@/modules/student/structure/StudentSystemShell";
import {Box} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {IconCertificate, IconGauge} from "@tabler/icons-react";

const links = [
    {label: "Dashboard", path: "/student", icon: IconGauge},
    {
        label: "Course",
        icon: IconCertificate,
        links: [
            {label: "Details", path: "/student/course"},
            {label: "Schedule", path: "/student/course/schedule"},
        ]
    }
];

export const StudentStructure = () => {
    return (
        <Box h="100vh">
            <StudentSystemShell links={links}>
                <Outlet />
            </StudentSystemShell>
        </Box>
    );
};