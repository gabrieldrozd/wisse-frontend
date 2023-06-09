import {Burger, Group, Image, MediaQuery, Navbar} from "@mantine/core";
import classes from "../styles/StudentSystemShell.module.scss";
import logo from "@assets/logo/wisse.svg";

export interface LogoSectionProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
}

export const StudentLogoSection = ({opened, setOpened}: LogoSectionProps) => {
    return (
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
                        onClick={() => setOpened(!opened)}
                    />
                </MediaQuery>
            </Group>
        </Navbar.Section>
    );
};