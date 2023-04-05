import {Box, Container} from "@mantine/core";
import {EnrollStepper} from "@components/Start/Enroll/EnrollStepper";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@common/constants/breakpoints";

export const EnrollPage = () => {
    const mediaMatch = useMediaQuery(`(max-width: ${breakpoints.lg_xl})`);
    const mobileWidth = mediaMatch ? "100%" : "80rem";

    return (
        <Container size="xl" w={mobileWidth}>
            <Box mt={40}>
                <EnrollStepper />
            </Box>
        </Container>
    );
};