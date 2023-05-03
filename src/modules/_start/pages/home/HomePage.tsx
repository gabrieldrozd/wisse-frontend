import {Box, Container} from "@mantine/core";
import {HeroWelcome} from "@modules.start/components/home/HeroWelcome";
import {FeaturesPreview} from "@modules.start/components/home/features/FeaturesPreview";

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