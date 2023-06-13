import {Navbar} from "@mantine/core";
import {UserNavigationButton} from "@components/SystemShell/UserNavigationButton";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import classes from "@app.admin/components/styles/AdminLayout.module.scss";

export interface UserButtonSectionProps {
    opened: boolean;
}

export const AdminUserButtonSection = ({opened}: UserButtonSectionProps) => {
    const {selectors: {accessToken}} = useAuthState();

    return (
        <Navbar.Section
            className={classes.navbarUserButtonSection}
            display={opened ? "none" : "flex"}
            mih={{base: 50, md: 70}}
            style={{display: "flex"}}
        >
            <UserNavigationButton accessToken={accessToken()} />
        </Navbar.Section>
    );
};