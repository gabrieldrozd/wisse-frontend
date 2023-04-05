import {Box, Container} from "@mantine/core";
import {HeroWelcome} from "@components/Start/Home/HeroWelcome";
import {FeaturesPreview} from "@components/Start/Home/Features/FeaturesPreview";

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