import {ReactNode, useEffect, useState} from "react";
import {AppShell, Navbar, Header, Text, MediaQuery, Burger, Flex, Paper, ScrollArea, Group,} from "@mantine/core";
import {AdminLogoSection} from "@/modules/admin/structure/navbar/AdminLogoSection";
import {AdminLinksSection} from "@/modules/admin/structure/navbar/AdminLinksSection";
import {AdminUserButtonSection} from "@/modules/admin/structure/navbar/AdminUserButtonSection";
import {AdminPageTitle} from "@/modules/admin/structure/header/AdminPageTitle";
import {LinkModel} from "@core/routing/models/links";
import classes from "./styles/AdminSystemShell.module.scss";
import {AdminHints} from "@/modules/admin/structure/header/AdminHints";
import {useLocation} from "react-router-dom";

export interface AdminSystemShellProps {
    links: LinkModel[];
    children?: ReactNode;
}

export const AdminSystemShell = ({links, children}: AdminSystemShellProps) => {
    const location = useLocation();
    const [opened, setOpened] = useState(false);
    const [asideOpened, setAsideOpened] = useState(false);
    const [currentHelpers, setCurrentHelpers] = useState<string[]>([]);

    useEffect(() => {
        let helpers: string[] = [];
        links.forEach((link) => {
            if (link.path === location.pathname && link.helpers) {
                helpers = link.helpers;
            } else if (link.links) {
                link.links.forEach((nestedLink) => {
                    if (nestedLink.path === location.pathname && nestedLink.helpers) {
                        helpers = nestedLink.helpers;
                    }
                });
            }
        });

        setCurrentHelpers(helpers ? helpers : [""]);
    }, [location]);

    const handleAsideOpen = () => {
        setAsideOpened(!asideOpened);
    };

    return (
        <AppShell
            layout="alt"
            navbarOffsetBreakpoint="md"
            navbar={
                <Navbar
                    className={classes.navbar}
                    hiddenBreakpoint="md"
                    hidden={!opened}
                    width={{md: 250, xl: 300}}
                >
                    <AdminLogoSection opened={opened} setOpened={setOpened} />
                    <ScrollArea style={{flexGrow: 1}} className={classes.navbarLinksSection}>
                        <AdminLinksSection links={links} />
                    </ScrollArea>
                    <AdminUserButtonSection opened={opened} />
                </Navbar>
            }
            header={
                <Header
                    className={classes.header}
                    height={{base: 50, md: 70}}
                >
                    <AdminPageTitle links={links} />

                    <Group>
                        <AdminHints helpers={currentHelpers} />
                        <MediaQuery largerThan="md" styles={{display: "none"}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="xl"
                                color="#333"
                                mr="sm"
                            />
                        </MediaQuery>
                    </Group>
                </Header>
            }
        >
            <Flex direction="column" align="stretch" h="100%">
                <Paper shadow="xl" radius="md" bg="white.0" h="100%" p={15}>
                    {children}
                </Paper>
            </Flex>
        </AppShell>
    );
};
