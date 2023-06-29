import {FeaturesPreview} from "@app.start/pages/HomePage/components/FeaturesPreview";
import {HeroWelcome} from "@app.start/pages/HomePage/components/HeroWelcome";
import {Box, Container} from "@mantine/core";

export const HomePage = () => {
    return (
        <Container size="xl">
            <Box mt={40}>
                <HeroWelcome />
            </Box>

            <Box mt={40}>
                <FeaturesPreview />
            </Box>
        </Container>
    );
};