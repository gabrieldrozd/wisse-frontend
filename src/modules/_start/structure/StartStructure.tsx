import {Outlet} from "react-router-dom";
import {StartNavbar} from "@modules.start/structure/navbar/StartNavbar";
import {Container, Flex} from "@mantine/core";

const links = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Enroll",
        path: "/enroll",
    },
];

export const StartStructure = () => {
    return (
        <Flex
            direction="column"
            w="100%"
            h="100%"
        >
            <StartNavbar links={links} />
            <Container size="xl">
                <Outlet />
            </Container>
        </Flex>
    );
};