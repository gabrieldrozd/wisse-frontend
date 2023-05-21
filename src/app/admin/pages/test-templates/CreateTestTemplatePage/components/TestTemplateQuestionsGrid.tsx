import {useTestTemplateFormContext} from "@app.admin/context/testTemplateFormContext";
import {Col, Divider, Flex, Grid, Group, Select, Switch, Text, Textarea, TextInput, Title} from "@mantine/core";
import {Button} from "@nextui-org/react";
import {MdAdd, MdCheckCircle, MdDelete, MdHighlightOff} from "react-icons/all";
import {QuestionPost, QuestionPostFormModel} from "@models/education/test-template/question";
import {categories, levels} from "@const/education";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";

export const TestTemplateQuestionsGrid = () => {
    const smMediaMatch = useMediaQuery(`(max-width: ${breakpoints.sm})`);
    const lgMediaMatch = useMediaQuery(`(max-width: ${breakpoints.lg})`);
    const form = useTestTemplateFormContext();

    const shortenedText = (text: string) => {
        if (smMediaMatch) {
            return text.length > 30 ? `"${text.substring(0, 30)}"` + "..." : `"${text}"`;
        } else {
            return text.length > 50 ? `"${text.substring(0, 50)}"` + "..." : `"${text}"`;
        }
    };

    return (
        <>
            {form.values.questions.map((question, index) => (
                <Grid
                    mx="auto"
                    key={question.externalId}
                    style={
                        question.existing
                            ? {backgroundColor: "#f5f5f5", borderRadius: 20, margin: "20px 0" }
                            : {}
                    }
                >
                    <Col xs={12}>
                        <Divider
                            my="xs"
                            labelPosition="right"
                            label={
                                <Flex align="center" justify="center">
                                    <Text size="xs" fw={700} color="indigo.5">{shortenedText(question.text)}</Text>
                                    <Button
                                        auto
                                        shadow
                                        color="secondary"
                                        css={{marginLeft: 10}}
                                        iconRight={<MdAdd size="20px" />}
                                        onPress={() => form.insertListItem("questions", QuestionPostFormModel.initialize())}
                                    />
                                    <Button
                                        auto
                                        shadow
                                        color="warning"
                                        css={{marginLeft: 10}}
                                        iconRight={<MdDelete size="20px" />}
                                        onPress={() => form.removeListItem("questions", index)}
                                    />
                                </Flex>
                            }
                        />
                    </Col>

                    <Col xs={12} lg={7} w="100%">
                        <Textarea
                            mb={20}
                            size="md"
                            minRows={3}
                            label="Question text"
                            placeholder="Enter question text"
                            required
                            disabled={question.existing}
                            {...form.getInputProps(`questions.${index}.text`)}
                        />
                        <Select
                            mb={20}
                            size="md"
                            data={levels}
                            label="Level"
                            placeholder="Select question level"
                            required
                            disabled={question.existing}
                            {...form.getInputProps(`questions.${index}.languageLevel`)}
                        />
                        <Select
                            mb={20}
                            size="md"
                            data={categories}
                            label="Category"
                            placeholder="Select question category"
                            required
                            disabled={question.existing}
                            {...form.getInputProps(`questions.${index}.category`)}
                        />
                    </Col>

                    <Col xs={12} lg={5} w="100%">
                        {question && question.answers && Array.from(question.answers).map((answer, answerIndex) => {
                            const answerProps = form.getInputProps(`questions.${index}.answers.${answerIndex}.correct`);
                            return (
                                <Group key={answer.externalId} align="center" mb={9}>
                                    <TextInput
                                        w={lgMediaMatch ? "75%" : "70%"}
                                        size="md"
                                        label="Answer text"
                                        placeholder="Enter answer text"
                                        required
                                        disabled={question.existing}
                                        {...form.getInputProps(`questions.${index}.answers.${answerIndex}.text`)}
                                    />
                                    <Switch
                                        mt={20}
                                        w={lgMediaMatch ? "20%" : "25%"}
                                        size="lg"
                                        required
                                        color="indigo.5"
                                        checked={answerProps.value}
                                        disabled={question.existing}
                                        onChange={(event) => answerProps.onChange(event.target.checked)}
                                        onLabel={<MdCheckCircle size="25px" style={{margin: "10px"}} />}
                                        offLabel={<MdHighlightOff size="25px" style={{margin: "10px"}} />}
                                    />
                                </Group>
                            );
                        })}
                    </Col>

                    <Col xs={12}>
                        <Button
                            auto
                            size="md"
                            color="warning"
                            css={{width: "100%"}}
                            iconRight={<MdDelete size="30px" />}
                            onPress={() => form.removeListItem("questions", index)}
                        >
                            <Title order={4}>Remove</Title>
                        </Button>
                    </Col>
                </Grid>
            ))}
        </>
    );
};