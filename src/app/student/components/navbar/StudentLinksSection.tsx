import {Navbar} from "@mantine/core";
import {LinksGroup} from "@/shared/components/SystemShell/NavbarLinksGroup";
import {useStudentRoutes} from "@app.student/hooks/useStudentRoutes";

export const StudentLinksSection = () => {
    const routes = useStudentRoutes();

    return (
        <Navbar.Section>
            {routes.map((route) => (
                <LinksGroup key={route.label} {...route} />
            ))}
        </Navbar.Section>
    );
};