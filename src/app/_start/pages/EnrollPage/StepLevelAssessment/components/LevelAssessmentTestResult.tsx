import testImg from "@assets/start/online_test.gif";
import {Box, Text, Title, Paper, Grid, Col, Flex, Badge} from "@mantine/core";
import {useTestSlice} from "@store/slices/education/test/testSlice";

export const LevelAssessmentTestResult = () => {
    const {selectors: {currentTestResult}} = useTestSlice();
    const testResult = currentTestResult();

    if (!testResult) {
        return <Text>Test is not available.</Text>;
    }

    const levelColor = (level: string) => {
        switch (level) {
            case "A1":
                return "red.6";
            case "A2":
                return "orange.6";
            case "B1":
                return "yellow.6";
            case "B2":
                return "green.6";
            case "C1":
                return "cyan.6";
            case "C2":
                return "blue.6";
            default:
                return "gray.6";
        }
    };

    const roundedPercentage = Math.round(testResult.percentage * 100);

    return (
        <Grid gutter="md">
            <Col md={12} lg={8}>
                <Flex justify="center" align="center">
                    <img src={testImg} alt="Your description" style={{width: "80%", height: "80%"}} />
                </Flex>
            </Col>
            <Col md={12} lg={4}>
                <Box p="md">
                    <Title order={2} mb={20}>Level Test Results</Title>
                    <Paper p="md" shadow="xs">
                        <Grid gutter="md">
                            <Col span={12}>
                                <Text size="xl" fw={500}>Total Answers:</Text>
                                <Badge py={20} my={5} w={100}>
                                    <Text size="xl" my={5}>
                                        {testResult.totalAnswers}
                                    </Text>
                                </Badge>
                            </Col>
                            <Col span={12}>
                                <Text size="xl" fw={500}>Correct Answers:</Text>
                                <Badge py={20} my={5} w={100} color="green.6">
                                    <Text size="xl" my={5}>
                                        {testResult.correctAnswers}
                                    </Text>
                                </Badge>
                            </Col>
                            <Col span={12}>
                                <Text size="xl" fw={500}>Incorrect Answers:</Text>
                                <Badge py={20} my={5} w={100} color="red.6">
                                    <Text size="xl" my={5}>
                                        {testResult.incorrectAnswers}
                                    </Text>
                                </Badge>
                            </Col>
                            <Col span={12}>
                                <Text size="xl" fw={500}>Percentage:</Text>
                                <Badge py={20} my={5} w={100} color={levelColor(testResult.calculatedLevel)}>
                                    <Text size="xl" my={5}>
                                        {roundedPercentage}%
                                    </Text>
                                </Badge>
                            </Col>
                            <Col span={12}>
                                <Text size="xl" fw={500}>Calculated Level:</Text>
                                <Badge py={20} my={5} w={100} color={levelColor(testResult.calculatedLevel)}>
                                    <Text size="xl">
                                        {testResult.calculatedLevel}
                                    </Text>
                                </Badge>
                            </Col>
                        </Grid>
                    </Paper>
                </Box>
            </Col>
        </Grid>
    );
};
