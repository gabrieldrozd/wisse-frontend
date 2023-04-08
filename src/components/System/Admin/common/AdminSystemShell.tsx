import {ReactNode, useState} from "react";
import {AppShell, Navbar, Header, Text, MediaQuery, Burger, Flex, Paper, ScrollArea,} from "@mantine/core";
import {AdminLogoSection} from "@components/System/Admin/common/Navbar/AdminLogoSection";
import {AdminLinksSection} from "@components/System/Admin/common/Navbar/AdminLinksSection";
import {AdminUserButtonSection} from "@components/System/Admin/common/Navbar/AdminUserButtonSection";
import {AdminPageTitle} from "@components/System/Admin/common/Header/AdminPageTitle";
import {LinkModel} from "@core/routing/models/links";
import classes from "./styles/AdminSystemShell.module.scss";

export interface AdminSystemShellProps {
    links: LinkModel[];
    children?: ReactNode;
}

export const AdminSystemShell = ({links, children}: AdminSystemShellProps) => {
    const [opened, setOpened] = useState(false);
    const [asideOpened, setAsideOpened] = useState(false);

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

                    <MediaQuery largerThan="md" styles={{display: "none"}}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="xl"
                            color="#333"
                            ml="xl"
                            mr="sm"
                        />
                    </MediaQuery>
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
