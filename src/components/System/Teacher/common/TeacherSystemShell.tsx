import {ReactNode, useEffect, useState} from "react";
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Image,
    Container
} from "@mantine/core";
import {UserNavigationButton} from "@components/common/SystemShell/UserNavigationButton";
import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge, IconLock,
    IconNotes,
    IconPresentationAnalytics
} from "@tabler/icons-react";
import {LinksGroup} from "@components/common/SystemShell/NavbarLinksGroup";
import classes from "./styles/TeacherSystemShell.module.scss";
import logo from "@assets/logo/wisse.svg";

const mockdata = [
    {label: "Dashboard", icon: IconGauge},
    {
        label: "Market news",
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            {label: "Overview", path: "/"},
            {label: "Forecasts", path: "/"},
            {label: "Outlook", path: "/"},
            {label: "Real time", path: "/"},
        ],
    },
    {
        label: "Releases",
        icon: IconCalendarStats,
        links: [
            {label: "Upcoming releases", path: "/"},
            {label: "Previous releases", path: "/"},
            {label: "Releases schedule", path: "/"},
        ],
    },
    {label: "Analytics", icon: IconPresentationAnalytics},
    {label: "Contracts", icon: IconFileAnalytics},
    {label: "Settings", icon: IconAdjustments},
    {
        label: "Security",
        icon: IconLock,
        links: [
            {label: "Enable 2FA", path: "/"},
            {label: "Change password", path: "/"},
            {label: "Recovery codes", path: "/"},
        ],
    },
];

export interface TeacherSystemShellProps {
    children?: ReactNode;
}

export const TeacherSystemShell = ({children}: TeacherSystemShellProps) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    useEffect(() => {
        console.log(opened);
    }, [opened]);

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
                    width={{md: 200, xl: 300}}
                >
                    <Navbar.Section
                        className={classes.navbarLogoSection}
                        display={opened ? "flex" : "none"}
                        mih={{base: 50, md: 70}}
                    >
                        <Group position="apart" px={10}>
                            <Image maw={200} src={logo} />

                            <MediaQuery largerThan="md" styles={{display: "none"}}>
                                <Burger
                                    ml="xl"
                                    size="xl"
                                    color="#f5f5f5"
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                />
                            </MediaQuery>
                        </Group>
                    </Navbar.Section>

                    <Navbar.Section grow className={classes.navbarLinksSection}>
                        {links}
                    </Navbar.Section>

                    <Navbar.Section
                        className={classes.navbarUserButtonSection}
                        display={opened ? "flex" : "none"}
                        mih={{base: 50, md: 70}}
                    >
                        <UserNavigationButton name="Gabriel" email="drozdgabriel@pm.me" />
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header
                    height={{base: 50, md: 70}}
                    p="md"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%"
                    }}
                >
                    {/* TODO: check whether such 'flexibility' is good enough */}


                    <Container>
                        <Text>Here we can go for some key command to search for actions or sth like that</Text>
                    </Container>

                    <Container>
                        <Text>Here we can go for some key command to search for actions or sth like that</Text>
                    </Container>


                    <MediaQuery largerThan="md" styles={{display: "none"}}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="xl"
                            color={theme.colors.gray[6]}
                            ml="xl"
                        />
                    </MediaQuery>
                </Header>
            }
        >
            {/* TODO: Content goes here */}
            {children}
        </AppShell>
    );
};
