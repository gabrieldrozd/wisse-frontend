import {TestModel} from "@app.start/models/testModel";
import {Text, Col, Grid, Title, Center, Flex, Divider, Paper, Badge, Box} from "@mantine/core";
import type {ITest} from "@models/education/test";
import {Button} from "@nextui-org/react";
import {useTestState} from "@store/slices/education/test/useTestState";
import clsx from "clsx";
import {useEffect, useState} from "react";
import {MdCircle, MdOutlineCircle} from "react-icons/md";

import classes from "./LevelAssessmentTestMode.module.scss";

interface Props {
    setCompleteTest: (testId: string) => void;
}

export const LevelAssessmentTestMode = ({setCompleteTest}: Props) => {
    const {
        selectors: {currentTest: currentTestSelector},
        actions: {
            answerQuestion,
            updateQuestionAnswer,
            completeTest
        }
    } = useTestState();
    const [test] = useState<TestModel>(TestModel.fromTest(currentTestSelector() ?? {} as ITest));
    const allQuestionsVisited = test?.testQuestions?.every(question => question.visited);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (!test?.externalId) {
        return <Text>Test is not available.</Text>;
    }

    useEffect(() => {
        test.testQuestions[currentQuestionIndex].visited = true;
    }, [currentQuestionIndex]);

    const handleCircleClick = (index: number) => {
        if (test.testQuestions[index]) {
            setCurrentQuestionIndex(index);
        }
    };

    const handleNavigation = (direction: "next" | "prev") => {
        if (direction === "next" && currentQuestionIndex < test.testQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (direction === "prev" && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerClick = async (answerId: string) => {
        const question = test.testQuestions[currentQuestionIndex];
        const selectedAnswer = question.answers.find(answer => answer.externalId === answerId);
        if (!question.isAnswered) {
            if (selectedAnswer) {
                selectedAnswer.isSelected = true;
            }
            const result = await answerQuestion(test.externalId, question.externalId, answerId);
            if (result) {
                question.isAnswered = true;
                setTimeout(() => {
                    handleNavigation("next");
                }, 200);
            }
        } else {
            const previouslySelectedAnswer = question.answers.find(answer => answer.isSelected);
            if (previouslySelectedAnswer) {
                previouslySelectedAnswer.isSelected = false;
            }
            if (selectedAnswer) {
                selectedAnswer.isSelected = true;
            }
            await updateQuestionAnswer(test.externalId, question.externalId, answerId);
        }
    };

    const handleCompleteTest = async () => {
        const result = await completeTest(test.externalId);
        if (result) {
            test.isCompleted = true;
            setCompleteTest(test.externalId);
        }
    };

    return (
        <>
            <Divider className={classes.topDivider} />
            <Grid>
                <Col xs={12}>
                    <Center>
                        <Title>{test.name}</Title>
                    </Center>
                </Col>

                <Col xs={12}>
                    <Center>
                        <Title order={6}>{test.description}</Title>
                    </Center>
                </Col>

                <Col xs={12}>
                    <Flex wrap="wrap" justify="center">
                        {test.testQuestions.map((question, index) => {
                            const isCurrentQuestion = index === currentQuestionIndex;
                            return (
                                <Box key={question.externalId} onClick={() => handleCircleClick(index)}>
                                    {question.isAnswered ? (
                                        <MdCircle
                                            className={clsx(
                                                classes.isAnsweredCircle,
                                                isCurrentQuestion ? classes.currentQuestionCircle : ""
                                            )}
                                        />
                                    ) : (
                                        <MdOutlineCircle
                                            className={clsx(
                                                classes.isAnsweredCircle,
                                                isCurrentQuestion ? classes.currentQuestionCircle : ""
                                            )}
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Flex>
                </Col>

                <Col xs={12} my={-10}>
                    <Divider
                        labelPosition="right"
                        label={<Title order={3}>{currentQuestionIndex + 1}/{test.testQuestions.length}</Title>}
                    />
                </Col>

                <Col xs={12}>
                    <Flex justify="center">
                        <Grid w={"100%"}>
                            <Col xs={12}>
                                <Flex gap={20}>
                                    <Badge color="indigo.5" fz={15}>
                                        {test.testQuestions[currentQuestionIndex].category
                                            ? test.testQuestions[currentQuestionIndex].category
                                            : "No category"}
                                    </Badge>
                                    <Badge color="indigo.5" fz={15}>
                                        {test.testQuestions[currentQuestionIndex].languageLevel
                                            ? test.testQuestions[currentQuestionIndex].languageLevel
                                            : "No language level"}
                                    </Badge>
                                </Flex>
                            </Col>

                            <Col xs={12} w={"100%"}>
                                <Paper shadow="md" className={classes.questionTextBox}>
                                    <Title order={3}>
                                        {test.testQuestions[currentQuestionIndex].text}
                                    </Title>
                                </Paper>
                            </Col>

                            <Col xs={12}>
                                {test.testQuestions[currentQuestionIndex].answers.map((answer, index) => (
                                    <Paper
                                        key={index}
                                        shadow="md"
                                        className={clsx(
                                            classes.answerTextBox,
                                            answer.isSelected && classes.selectedAnswerTextBox,
                                        )}
                                        onClick={() => handleAnswerClick(answer.externalId)}
                                    >
                                        <Text>{answer.text}</Text>
                                    </Paper>
                                ))}
                            </Col>

                            <Col xs={12}>
                                <Flex
                                    my={20}
                                    wrap="wrap"
                                    align="center"
                                    justify="space-evenly"
                                >
                                    <Button
                                        shadow
                                        disabled={currentQuestionIndex === 0}
                                        onPress={() => handleNavigation("prev")}
                                    >
                                        <Text>Previous</Text>
                                    </Button>

                                    <Button
                                        shadow
                                        disabled={currentQuestionIndex === test.testQuestions.length - 1}
                                        onPress={() => handleNavigation("next")}
                                    >
                                        <Text>Next</Text>
                                    </Button>
                                </Flex>
                            </Col>

                            <Col xs={12}>
                                <Divider
                                    label="Finish the test"
                                    labelPosition="center"
                                    mb={20}
                                />
                                <Flex justify="center">
                                    <Button
                                        disabled={!allQuestionsVisited}
                                        onPress={handleCompleteTest}
                                        style={{width: "50%"}}
                                    >
                                        <Text>Complete</Text>
                                    </Button>
                                </Flex>
                            </Col>
                        </Grid>
                    </Flex>
                </Col>
            </Grid>
        </>
    );
};
