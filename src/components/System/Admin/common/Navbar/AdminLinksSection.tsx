import {Navbar, ScrollArea} from "@mantine/core";
import {LinksGroup} from "@components/common/SystemShell/NavbarLinksGroup";
import classes from "../styles/AdminSystemShell.module.scss";

export interface LinksSectionProps {
    links: any;
}

export const AdminLinksSection = ({links}: LinksSectionProps) => {
    const navlinks = links.map((item: any) => <LinksGroup {...item} key={item.label} />);

    return (
        <Navbar.Section>
            {navlinks}
        </Navbar.Section>
    );
};