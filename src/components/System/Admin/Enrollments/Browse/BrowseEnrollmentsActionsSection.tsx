import {Flex, Text} from "@mantine/core";
import {useBrowseEnrollmentsContext} from "./context/BrowseEnrollmentsContext";

export const BrowseEnrollmentsActionsSection = () => {
    const {enrollment} = useBrowseEnrollmentsContext();

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: "cornflowerblue",
            }}
        >
            {enrollment && (
                <Text>
                    {enrollment.value.externalId}
                </Text>
            )}
        </Flex>
    );
};