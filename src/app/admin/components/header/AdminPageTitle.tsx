import {Paper, Title} from "@mantine/core";
import {useLocation} from "react-router-dom";
import {useAdminTitle} from "@app.admin/hooks/useAdminTitle";

export const AdminPageTitle = () => {
    const location = useLocation();
    const title = useAdminTitle({currentPath: location.pathname});

    return (
        <Paper bg="indigo.2" mx={20}>
            <Title order={2} p={10} fw={600}>
                {title}
            </Title>
        </Paper>
    );
};