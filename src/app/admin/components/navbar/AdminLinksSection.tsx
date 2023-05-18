import {Navbar} from "@mantine/core";
import {LinksGroup} from "@components/SystemShell/NavbarLinksGroup";
import {useAdminRoutes} from "@app.admin/hooks/useAdminRoutes";

export const AdminLinksSection = () => {
    const routes = useAdminRoutes();

    return (
        <Navbar.Section>
            {routes.map((route) => (
                <LinksGroup key={route.label} {...route} />
            ))}
        </Navbar.Section>
    );
};