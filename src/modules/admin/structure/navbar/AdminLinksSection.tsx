import {Navbar} from "@mantine/core";
import {LinksGroup} from "@components/SystemShell/NavbarLinksGroup";

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