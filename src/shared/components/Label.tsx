import {Text} from "@mantine/core";

interface Props {
    text: string;
}

export const Label = ({text}: Props) => {
    return (
        <Text size="md" color="gray" fw={500}>
            {text}
        </Text>
    );
};