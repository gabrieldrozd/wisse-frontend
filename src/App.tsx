import {useAppContext} from "@context/ApplicationContext";
import {Flex, Loader, LoadingOverlay, Title} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {ApplicationRouter} from "@routing/ApplicationRouter";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RouterProvider} from "react-router-dom";

const queryClient = new QueryClient();

export const App = () => {
    const {isLoading} = useAppContext();

    return (
        <Flex direction="column" align="flex-start" justify="flex-start">
            <QueryClientProvider client={queryClient}>
                <LoadingOverlay
                    visible={isLoading}
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
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Flex>
    );
};
