import {AdminHints} from "@app.admin/components/header/AdminHints";
import {AdminPageTitle} from "@app.admin/components/header/AdminPageTitle";
import {AdminLinksSection} from "@app.admin/components/navbar/AdminLinksSection";
import {AdminLogoSection} from "@app.admin/components/navbar/AdminLogoSection";
import {AdminUserButtonSection} from "@app.admin/components/navbar/AdminUserButtonSection";
import {AppShell, Burger, Flex, Group, Header, MediaQuery, Navbar, Paper, ScrollArea} from "@mantine/core";
import {useState} from "react";
import {Outlet} from "react-router-dom";

import classes from "./components/styles/AdminLayout.module.scss";

export const AdminLayout = () => {
    const [opened, setOpened] = useState(false);

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
                        <AdminLinksSection />
                    </ScrollArea>
                    <AdminUserButtonSection opened={opened} />
                </Navbar>
            }
            header={
                <Header
                    className={classes.header}
                    height={{base: 50, md: 70}}
                >
                    <AdminPageTitle />

                    <Group>
                        <AdminHints />
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

                    {/* Content */}
                    <Outlet />
                    {/* Content */}

                </Paper>
            </Flex>
        </AppShell>
    );
};