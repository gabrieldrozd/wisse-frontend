import {Box, Text, Title, Paper, Grid, Col} from "@mantine/core";
import {useTestSlice} from "@store/slices/education/test/testSlice";

export const LevelAssessmentTestResult = () => {
    const {selectors: {currentTestResult}} = useTestSlice();
    const testResult = currentTestResult();

    if (!testResult) {
        return <Text>Test is not available.</Text>;
    }

    // TODO: Impove UI for result presentation
    // TODO: Impove UI for result presentation
    // TODO: Impove UI for result presentation

    // TODO: On the left side there could be an animation like on startPage
    // TODO: and on the right side there could be a result presentation

    return (
        <Box p="md">
            <Title order={2}>Test Results</Title>
            <Paper p="md" shadow="xs">
                <Grid gutter="md">
                    <Col span={6}>
                        <Text size="lg">Test ID:</Text>
                        <Text>{testResult.testExternalId}</Text>
                    </Col>
                    <Col span={6}>
                        <Text size="lg">Calculated Level:</Text>
                        <Text>{testResult.calculatedLevel}</Text>
                    </Col>
                    <Col span={6}>
                        <Text size="lg">Correct Answers:</Text>
                        <Text>{testResult.correctAnswers}</Text>
                    </Col>
                    <Col span={6}>
                        <Text size="lg">Incorrect Answers:</Text>
                        <Text>{testResult.incorrectAnswers}</Text>
                    </Col>
                    <Col span={6}>
                        <Text size="lg">Total Answers:</Text>
                        <Text>{testResult.totalAnswers}</Text>
                    </Col>
                    <Col span={6}>
                        <Text size="lg">Percentage:</Text>
                        <Text>{testResult.percentage}%</Text>
                    </Col>
                </Grid>
            </Paper>
        </Box>
    );
};
