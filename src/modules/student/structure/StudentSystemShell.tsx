import {ReactNode, useState} from "react";
import {AppShell, Navbar, Header, Text, MediaQuery, Burger, Container} from "@mantine/core";
import classes from "./styles/StudentSystemShell.module.scss";
import {StudentLogoSection} from "@modules.student/structure/navbar/StudentLogoSection";
import {StudentLinksSection} from "@modules.student/structure/navbar/StudentLinksSection";
import {StudentUserButtonSection} from "@modules.student/structure/navbar/StudentUserButtonSection";

export interface StudentSystemShellProps {
    links: any;
    children?: ReactNode;
}

export const StudentSystemShell = ({links, children}: StudentSystemShellProps) => {
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            layout="alt"
            styles={{main: {background: "#f5f5f5"}}}
            navbarOffsetBreakpoint="md"
            asideOffsetBreakpoint="md"
            navbar={
                <Navbar
                    className={classes.navbar}
                    hiddenBreakpoint="md"
                    hidden={!opened}
                    width={{md: 250, xl: 300}}
                >
                    <StudentLogoSection opened={opened} setOpened={setOpened} />
                    <StudentLinksSection links={links} />
                    <StudentUserButtonSection opened={opened} />
                </Navbar>
            }
            header={
                <Header className={classes.header} height={{base: 50, md: 70}}>
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
            {children}
        </AppShell>
    );
};
