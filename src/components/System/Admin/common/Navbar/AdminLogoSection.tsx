import {Burger, Group, Image, MediaQuery, Navbar} from "@mantine/core";
import classes from "../styles/AdminSystemShell.module.scss";
import logo from "@assets/logo/wisse.svg";
import {useNavigate} from "react-router-dom";

export interface LogoSectionProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
}

export const AdminLogoSection = ({opened, setOpened}: LogoSectionProps) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/admin");
    }

    return (
        <Navbar.Section
            className={classes.navbarLogoSection}
            display={opened ? "flex" : "none"}
            mih={{base: 50, md: 70}}
        >
            <Group position="apart" px={10}>
                <Image maw={200} src={logo} onClick={handleLogoClick} style={{cursor: "pointer"}}/>

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