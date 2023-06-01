import {StartNavbar} from "@app.start/components/navbar/StartNavbar";
import {EnrollPageContext} from "@app.start/context/enrollPageContext";
import {Container, Flex} from "@mantine/core";
import {Outlet} from "react-router-dom";

export const StartLayout = () => {
    return (
        <Flex
            direction="column"
            w="100%"
            h="100%"
        >
            <StartNavbar />
            <Container size="xl">
                <EnrollPageContext>
                    <Outlet />
                </EnrollPageContext>
            </Container>
        </Flex>
    );
};