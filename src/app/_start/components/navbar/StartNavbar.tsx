import {useEffect, useState} from "react";
import {Header, Container, Group, Burger, Paper, Transition, Image, Divider} from "@mantine/core";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import {breakpoints} from "@const/breakpoints";
import {StartLinkItem} from "@app.start/components/navbar/StartLinkItem";
import {LoginForm} from "@app.start/components/navbar/LoginForm";
import {useStartRoutes} from "@app.start/hooks/useStartRoutes";
import classes from "./styles/StartNavbar.module.scss";
import logo from "@assets/logo/wisse.svg";

export const StartNavbar = () => {
    const navigate = useNavigate();
    const routes = useStartRoutes();
    const mediaMatch = useMediaQuery(`(max-width: ${breakpoints.md})`);
    const currentPath = window.location.pathname;
    const [isDropdownOpened, {toggle, close}] = useDisclosure(false);
    const [active, setActive] = useState(currentPath);

    useEffect(() => {
        setActive(currentPath);
        if (!mediaMatch) close();
    }, [currentPath, mediaMatch]);

    const imageNavigation = () => {
        navigate("/");
    };

    return (
        <Header height={80} mb={20} className={classes.root}>
            <Container className={classes.navbar} size="xl">
                <Image maw={200} src={logo} onClick={imageNavigation} style={{cursor: "pointer"}} />
                {/* default view */}
                <Group className={classes.navLinks}>
                    {routes.map((route) => (
                        <StartLinkItem
                            key={route.label + route.path}
                            route={route}
                            isActive={active === route.path}
                            setActive={setActive}
                            isDropdown={isDropdownOpened}
                            closeDropdown={close}
                        />
                    ))}
                    <LoginForm isDropdown={isDropdownOpened} setActive={setActive} />
                </Group>

                {/* mobile view */}
                <Burger opened={isDropdownOpened} onClick={toggle} className={classes.burgerIcon} size="lg" color="#fafafa" />
                <Transition transition="fade" duration={200} mounted={isDropdownOpened} keepMounted={false}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {routes.map((route) => (
                                <div
                                    key={route.label + route.path}
                                    className={classes.dropdownLinkItem}
                                >
                                    <StartLinkItem
                                        route={route}
                                        isActive={active === route.path}
                                        setActive={setActive}
                                        isDropdown={isDropdownOpened}
                                        closeDropdown={close}
                                    />
                                </div>
                            ))}
                            <Divider h={5} size={5} />
                            <LoginForm isDropdown={isDropdownOpened} setActive={setActive} />
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
};