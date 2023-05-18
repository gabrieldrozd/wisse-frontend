import {useNavigate} from "react-router-dom";
import notFound from "@assets/common/data-not-found.gif";
import {Button, Flex, Title} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";

interface Props {
    dataName: string;
}

export const DataNotFound = ({dataName}: Props) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            h="100%"
        >
            <Title>Unfortunately, we couldn't find any {dataName}.</Title>

            <img src={notFound} alt="Data not found" />

            <Button
                mt={20}
                size="lg"
                color="indigo.5"
                variant="filled"
                onClick={handleGoBack}
                leftIcon={<IconChevronLeft />}
                style={{
                    boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.2)",
                }}
            >
                Go back
            </Button>
        </Flex>
    );
};