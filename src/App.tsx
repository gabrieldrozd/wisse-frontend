import {Flex, LoadingOverlay} from "@mantine/core";
import {RouterProvider} from "react-router-dom";
import {ApplicationRouter} from "@core/routing/ApplicationRouter";
import {Notifications} from "@mantine/notifications";
import {useGlobalContext} from "@core/context/ApplicationContext";

export const App = () => {
    const {isLoading} = useGlobalContext();

    return (
        <Flex direction="column">
            <LoadingOverlay visible={isLoading.value} />
            <Notifications zIndex={9999} position="bottom-right" transitionDuration={400} />
            <RouterProvider router={ApplicationRouter} />
        </Flex>
    );
};
