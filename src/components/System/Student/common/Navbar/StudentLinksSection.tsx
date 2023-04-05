import {Navbar} from "@mantine/core";
import {LinksGroup} from "@components/common/SystemShell/NavbarLinksGroup";
import classes from "../styles/StudentSystemShell.module.scss";

export interface LinksSectionProps {
    links: any;
}

export const StudentLinksSection = ({links}: LinksSectionProps) => {
    const navlinks = links.map((item: any) => <LinksGroup {...item} key={item.label} />);

    return (
        <Navbar.Section grow className={classes.navbarLinksSection}>
            {navlinks}
        </Navbar.Section>
    );
};