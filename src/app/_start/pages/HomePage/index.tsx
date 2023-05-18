import {Button as NextButton} from "@nextui-org/react";
import {Box, Container} from "@mantine/core";
import {HeroWelcome} from "@app.start/pages/HomePage/components/HeroWelcome";
import {FeaturesPreview} from "@app.start/pages/HomePage/components/FeaturesPreview";

export const HomePage = () => {
    return (
        <Container size="xl">
            <Box mt={40}>
                <HeroWelcome />
            </Box>

            <Box mt={40}>
                <FeaturesPreview />
            </Box>

            {/* TODO: Uncomment for colors adjustments (NextUI) */}
            {/*<Group m={0}>*/}
            {/*    <NextButton bordered size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton shadow bordered size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton ghost animated size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton animated size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton shadow animated size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton flat animated size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton flat shadow animated size="sm" color="primary">primary</NextButton>*/}
            {/*    <NextButton light animated size="sm" color="primary">primary</NextButton>*/}
            {/*</Group>*/}

            {/*<Group m={0}>*/}
            {/*    <NextButton bordered size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton shadow bordered size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton ghost animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton shadow animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton flat animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton flat shadow animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*    <NextButton light animated size="sm" color="secondary">secondary</NextButton>*/}
            {/*</Group>*/}

            {/*<Group m={0}>*/}
            {/*    <NextButton bordered size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton shadow bordered size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton ghost animated size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton animated size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton shadow animated size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton flat animated size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton flat shadow animated size="sm" color="success">success</NextButton>*/}
            {/*    <NextButton light animated size="sm" color="success">success</NextButton>*/}
            {/*</Group>*/}

            {/*<Group m={0}>*/}
            {/*    <NextButton bordered size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton shadow bordered size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton ghost animated size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton animated size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton shadow animated size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton flat animated size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton flat shadow animated size="sm" color="warning">warning</NextButton>*/}
            {/*    <NextButton light animated size="sm" color="warning">warning</NextButton>*/}
            {/*</Group>*/}

            {/*<Group m={0}>*/}
            {/*    <NextButton bordered size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton shadow bordered size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton ghost animated size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton animated size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton shadow animated size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton flat animated size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton flat shadow animated size="sm" color="error">error</NextButton>*/}
            {/*    <NextButton light animated size="sm" color="error">error</NextButton>*/}
            {/*</Group>*/}
        </Container>
    );
};