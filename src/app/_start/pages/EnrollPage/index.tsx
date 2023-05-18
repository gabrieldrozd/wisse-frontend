import {Box, Container} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";
import {EnrollStepper} from "@app.start/pages/EnrollPage/components/EnrollStepper";

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