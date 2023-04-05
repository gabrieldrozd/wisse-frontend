import {useEffect, useState} from "react";
import {Header, Container, Group, Burger, Paper, Transition, Image, Divider} from "@mantine/core";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {StartLinkItem} from "@components/Start/common/Navbar/StartLinkItem";
import {useNavigate} from "react-router-dom";
import {LoginForm} from "@components/Start/common/Navbar/LoginForm";
import {breakpoints} from "@common/constants/breakpoints";
import classes from "./styles/StartNavbar.module.scss";
import logo from "@assets/logo/wisse.svg";

interface StartNavbarProps {
    links: { path: string; label: string }[];
}

export const StartNavbar = ({links}: StartNavbarProps) => {
    const navigate = useNavigate();
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

    const linkItems = links.map((link) => {
        const isActive = active === link.path;

        return (
            <StartLinkItem
                key={link.label + link.path}
                link={link}
                isActive={isActive}
                setActive={setActive}
                isDropdown={isDropdownOpened}
                closeDropdown={close}
            />
        );
    });

    return (
        <Header height={80} mb={20} className={classes.root}>
            <Container className={classes.navbar}>
                <Image maw={200} src={logo} onClick={imageNavigation} style={{cursor: "pointer"}} />
                {/* default view */}
                <Group className={classes.navLinks}>
                    {linkItems}
                    <LoginForm isDropdown={isDropdownOpened} setActive={setActive} />
                </Group>

                {/* mobile view */}
                <Burger opened={isDropdownOpened} onClick={toggle} className={classes.burgerIcon} size="lg" color="#fafafa" />
                <Transition transition="fade" duration={200} mounted={isDropdownOpened} keepMounted={false}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {linkItems}
                            <Divider h={5} size={5} />
                            <LoginForm isDropdown={isDropdownOpened} setActive={setActive} />
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
};