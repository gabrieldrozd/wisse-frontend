import {Flex, Loader, Text} from "@mantine/core";
import classes from "./LocalLoader.module.scss";

interface Props {
    text?: string;
    textSize?: number;
    loaderSize?: number;
}

export const LocalLoader = ({text, textSize, loaderSize}: Props) => {
    return (
        <Flex
            className={classes.animatedBackground}
            direction="column"
            align="center"
            justify="center"
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#efefef",
                borderRadius: 20
            }}
        >
            <Loader size={loaderSize || 100} variant="dots" color="indigo.5" />
            <Text mt={20} fw={500} size={textSize || "lg"}>
                {text || "Loading..."}
            </Text>
        </Flex>
    );
};
