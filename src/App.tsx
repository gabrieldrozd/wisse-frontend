import {useEffect, useState} from "react";
import {RouterProvider} from "react-router-dom";
import {Notifications} from "@mantine/notifications";
import {Flex, Loader, LoadingOverlay, Title} from "@mantine/core";
import {ApplicationRouter} from "@routing/ApplicationRouter";
import {useGlobalContext} from "@context/ApplicationContext";

export const App = () => {
    const {isLoading} = useGlobalContext();
    const [isUiReady, setIsUiReady] = useState(false);

    useEffect(() => {
        window.onload = () => {
            setIsUiReady(true);
        };
    }, []);

    return (
        <Flex direction="column" align="flex-start" justify="flex-start">
            <LoadingOverlay
                visible={isLoading.value || !isUiReady}
                overlayBlur={10}
                loader={
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        bg="indigo.0"
                        px={50}
                        py={20}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "fixed",
                            top: "50%",
                            left: "calc(50% - 100px)",
                            borderRadius: "1rem",
                        }}
                    >
                        <Title order={2}>Loading</Title>
                        <Loader mt={20} color="indigo.7" size={100} variant="dots" />
                    </Flex>
                }
            />
            <Notifications zIndex={9999} position="bottom-right" transitionDuration={400} />
            <RouterProvider router={ApplicationRouter} />
        </Flex>
    );
};
