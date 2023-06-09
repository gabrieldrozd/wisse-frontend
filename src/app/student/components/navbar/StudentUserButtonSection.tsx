import {Navbar} from "@mantine/core";
import {UserNavigationButton} from "@/shared/components/SystemShell/UserNavigationButton";
import {useAuthState} from "@store/slices/users/auth/useAuthState";
import classes from "../styles/StudentSystemShell.module.scss";

export interface UserButtonSectionProps {
    opened: boolean;
}

export const StudentUserButtonSection = ({opened}: UserButtonSectionProps) => {
    const {selectors: {accessToken}} = useAuthState();

    return (
        <Navbar.Section
            className={classes.navbarUserButtonSection}
            display={opened ? "flex" : "none"}
            mih={{base: 50, md: 70}}
        >
            <UserNavigationButton accessToken={accessToken()} />
        </Navbar.Section>
    );
};