import {Center, Flex, Loader, LoadingOverlay, Title} from "@mantine/core";
import {RouterProvider} from "react-router-dom";
import {ApplicationRouter} from "@core/routing/ApplicationRouter";
import {Notifications} from "@mantine/notifications";
import {useGlobalContext} from "@core/context/ApplicationContext";

export const App = () => {
    const {isLoading} = useGlobalContext();

    return (
        <Flex direction="column">
            <LoadingOverlay
                visible={isLoading.value}
                loader={
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        bg="indigo.0"
                        p={20}
                        style={{
                            borderRadius: "1rem",
                        }}
                    >
                        <Title order={2}>Loading</Title>
                        <Loader mt={10} color="indigo.7" size={60} variant="dots" />
                    </Flex>
                }
            />
            <Notifications zIndex={9999} position="bottom-right" transitionDuration={400} />
            <RouterProvider router={ApplicationRouter} />
        </Flex>
    );
};
