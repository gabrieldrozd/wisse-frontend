import {Outlet} from "react-router-dom";
import {Container, Flex} from "@mantine/core";
import {StartNavbar} from "@app.start/components/navbar/StartNavbar";

export const StartLayout = () => {
    return (
        <Flex
            direction="column"
            w="100%"
            h="100%"
        >
            <StartNavbar />
            <Container size="xl">
                <Outlet />
            </Container>
        </Flex>
    );
};