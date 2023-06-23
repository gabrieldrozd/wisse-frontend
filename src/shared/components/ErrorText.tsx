import {Text} from "@mantine/core";

interface Props {
    text: string;
}

export const ErrorText = ({text}: Props) => {
    return (
        <Text color="red.6" size="xs" fw={500}>
            {text}
        </Text>
    );
};