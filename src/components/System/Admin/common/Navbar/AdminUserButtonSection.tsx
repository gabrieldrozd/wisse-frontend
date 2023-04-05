import {Navbar} from "@mantine/core";
import {UserNavigationButton} from "@components/common/SystemShell/UserNavigationButton";
import {useAuthSlice} from "@store/slices/users/auth/authSlice";
import classes from "../styles/AdminSystemShell.module.scss";

export interface UserButtonSectionProps {
    opened: boolean;
}

export const AdminUserButtonSection = ({opened}: UserButtonSectionProps) => {
    const {selectors: {accessToken}} = useAuthSlice();

    console.log(opened);

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