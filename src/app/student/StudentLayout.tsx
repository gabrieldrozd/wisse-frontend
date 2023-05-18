import {useState} from "react";
import {Outlet} from "react-router-dom";
import {AppShell, Burger, Container, Header, MediaQuery, Navbar, ScrollArea, Text} from "@mantine/core";
import {StudentLogoSection} from "@app.student/components/navbar/StudentLogoSection";
import {StudentLinksSection} from "@app.student/components/navbar/StudentLinksSection";
import {StudentUserButtonSection} from "@app.student/components/navbar/StudentUserButtonSection";
import classes from "./components/styles/StudentSystemShell.module.scss";

export const StudentLayout = () => {
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
                    <StudentLogoSection opened={opened} setOpened={setOpened} />
                    <ScrollArea style={{flexGrow: 1}} className={classes.navbarLinksSection}>
                        <StudentLinksSection />
                    </ScrollArea>
                    <StudentUserButtonSection opened={opened} />
                </Navbar>
            }
            header={
                <Header
                    className={classes.header}
                    height={{base: 50, md: 70}}
                >
                    {/* TODO: make this StudentLayout same in terms of structure as AdminLayout */}
                    {/* TODO: I see that there is no StudentPageTitle, StudentHints etc */}

                    <Container>
                        <Text>Here we can go for some key command to search for actions or sth like that</Text>
                    </Container>


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

            {/* Content */}
            <Outlet />
            {/* Content */}

        </AppShell>
    );
};