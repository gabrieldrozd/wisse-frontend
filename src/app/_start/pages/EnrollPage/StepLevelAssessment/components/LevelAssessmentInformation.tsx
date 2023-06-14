import {Col, Flex, Grid, Mark, Text} from "@mantine/core";
import {Button} from "@nextui-org/react";

interface Props {
    setTestMode: () => void;
}

export const LevelAssessmentInformation = ({setTestMode}: Props) => {
    return (
        <Grid p={20}>
            <Col xs={12}>
                <Text size="xl" weight={500} mb={15}>
                    About the Level Assessment Test
                </Text>
                <Text size={14}>
                    Our level assessment test is designed to accurately determine your current language
                    proficiency level. This helps us place you in the most suitable course. The test
                    consists of single-choice questions covering various aspects of the language,
                    including grammar, vocabulary, and comprehension. Please note that there is no pass
                    or fail in this test. It is simply a tool to understand your current language skills.
                </Text>
            </Col>

            <Col xs={12} md={6}>
                <Text size="xl" weight={500} mb={15}>
                    Test Guidelines
                </Text>

                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>Time Limit</Mark>
                    : The test should take approximately 20 minutes to complete.
                </Text>
                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>No Cheating</Mark>
                    : Please do not use any external resources while taking the test.
                </Text>
                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>Honesty</Mark>
                    : Answer the questions to the best of your ability for the most accurate results.
                </Text>
                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>Test Format</Mark>
                    : The test is composed of single-choice questions. Read each question carefully
                    before selecting your answer.
                </Text>
            </Col>

            <Col xs={12} md={6}>
                <Text size="xl" weight={500} mb={15}>
                    Additional Information
                </Text>

                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>Preparation</Mark>
                    : Ensure you are in a quiet environment where you can concentrate. Make sure you have
                    a stable internet connection.
                </Text>
                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>After the Test</Mark>
                    : After completing the test, your answers will be automatically analyzed. You will
                    receive results immediately after completion.
                </Text>
                <Text size={14} mb={10}>
                    <Mark color="indigo.2" fw={500} p={2}>Test Results</Mark>
                    : Your test results will be available immediately after completion.<br /> You will also
                    receive an email with a detailed report of your performance.
                </Text>
            </Col>

            <Col xs={12}>
                <Flex direction="column" justify="center" align="center">
                    <Text size="xl" weight={500} mb={15}>
                        Ready to take the test?
                    </Text>
                    <Button
                        shadow
                        size="lg"
                        onClick={() => setTestMode()}
                    >
                        Start Test
                    </Button>
                </Flex>
            </Col>

            <Col xs={12}>
                <Flex direction="column" justify="center" align="center">
                    <Text size="lg" weight={500} mb={-40}>
                        If not, simply click Skip button to continue
                    </Text>
                </Flex>
            </Col>
        </Grid>
    );
};