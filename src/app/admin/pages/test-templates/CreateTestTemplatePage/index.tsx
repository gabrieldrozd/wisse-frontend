import {useCallback, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useMediaQuery} from "@mantine/hooks";
import {Group, TextInput, Text, Textarea, Select, Divider, Switch, Grid, Col, Title, Flex, Code} from "@mantine/core";
import {MdAdd, MdDelete} from "react-icons/all";
import {Button} from "@nextui-org/react";
import {uuid} from "@utils/uuidUtils";
import {categories, levels} from "@const/education";
import {breakpoints} from "@const/breakpoints";
import {ITestTemplatePost} from "@models/education/test-template/testTemplate";
import {IQuestion, IQuestionPost, QuestionPost} from "@models/education/test-template/question";
import {useQuestionSlice} from "@store/slices/education/question/questionSlice";

export const CreateTestTemplatePage = () => {
    const {actions} = useQuestionSlice();

    const [testLevel, setTestLevel] = useState(levels[0].value);
    const [existingQuestions, setExistingQuestions] = useState<IQuestion[]>([]);

    const mdMediaMatch = useMediaQuery(`(max-width: ${breakpoints.md})`);
    const lgMediaMatch = useMediaQuery(`(max-width: ${breakpoints.lg})`);
    const form = useForm<ITestTemplatePost>({
        initialValues: {
            id: uuid(),
            name: "",
            description: "",
            languageLevel: levels[0].value,
            questionIds: [] as string[],
            questions: [] as IQuestionPost[],
        },
    });

    const fetchExistingQuestions = useCallback(async () => {
        const questions = await actions.browseQuestionsByLevel(testLevel);
        setExistingQuestions(questions.list);
    }, [actions, testLevel]);

    useEffect(() => {
        console.log("changed from", testLevel);
        setTestLevel(form.values.languageLevel);
        console.log("to", form.values.languageLevel);
    }, [form.values.languageLevel]);

    useEffect(() => {
        fetchExistingQuestions().then();
        console.log("fetched existing questions", existingQuestions);
    }, [testLevel]);

    const questionFields = form.values.questions.map((question, index) => (
        <Grid key={question.id} mx="auto">
            <Col xs={12}>
                <Divider
                    my="xs"
                    labelPosition="right"
                    label={
                        <Flex align="center" justify="space-between">
                            <Text size="xs">
                                {question.text.length > 50
                                    ? question.text.substring(0, 50) + "..."
                                    : question.text}
                            </Text>
                            <Button
                                auto
                                shadow
                                size="sm"
                                color="secondary"
                                css={{marginLeft: 10}}
                                iconRight={<MdAdd size="20px" />}
                                onPress={() => form.insertListItem("questions", QuestionPost.initialize())}
                            />
                            <Button
                                auto
                                shadow
                                size="sm"
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
                    {...form.getInputProps(`questions.${index}.text`)}
                />

                <Select
                    mb={20}
                    size="md"
                    data={levels}
                    label="Level"
                    placeholder="Select question level"
                    required
                    {...form.getInputProps(`questions.${index}.level`)}
                />

                <Select
                    mb={20}
                    size="md"
                    data={categories}
                    label="Category"
                    placeholder="Select question category"
                    required
                    {...form.getInputProps(`questions.${index}.category`)}
                />
            </Col>

            <Col xs={12} lg={5} w="100%">
                {question && question.answers && Array.from(question.answers).map((answer, answerIndex) => {
                    const answerProps = form.getInputProps(`questions.${index}.answers.${answerIndex}.correct`);
                    return (
                        <Group key={answer.id} align="center" mb={9}>
                            <TextInput
                                w={lgMediaMatch ? "75%" : "70%"}
                                size="md"
                                label="Answer text"
                                placeholder="Enter answer text"
                                required
                                {...form.getInputProps(`questions.${index}.answers.${answerIndex}.text`)}
                            />

                            <Switch
                                mt={20}
                                w={lgMediaMatch ? "20%" : "25%"}
                                size="md"
                                label="Correct"
                                required
                                checked={answerProps.value}
                                onChange={(event) => answerProps.onChange(event.target.checked)}
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
    ));

    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // https://mantine.dev/core/affix/

    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // https://mantine.dev/core/affix/

    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // TODO: Use Mantine.Affix as a submit button
    // https://mantine.dev/core/affix/

    // TODO: Additionally we can use Mantine.Affix not only as a submit button,
    //  but also as a button to add new question or remove existing one

    return (
        <Grid mx="auto" grow>
            <Col xs={12} md={6}>
                <Flex
                    direction={{base: "column", md: "row"}}
                    gap={20}
                    mb={20}
                >
                    <TextInput
                        w={{base: "100%", md: "80%"}}
                        size="md"
                        label="Test template name"
                        placeholder="Enter test template name"
                        required
                        {...form.getInputProps("name")}
                    />

                    <Select
                        w={{base: "100%", md: "20%"}}
                        size="md"
                        data={levels}
                        label="Level"
                        placeholder="Select your level"
                        required
                        {...form.getInputProps("languageLevel")}
                    />
                </Flex>

                <Textarea
                    mb={20}
                    size="md"
                    minRows={5}
                    label="Test template description"
                    placeholder="Enter test template description"
                    required
                    {...form.getInputProps("description")}
                />
            </Col>

            <Col xs={12}>
                <Divider
                    labelPosition="center"
                    label={
                        <Title order={3}>
                            Questions ({form.values.questions.length})
                        </Title>
                    }
                />
            </Col>

            <Col xs={12}>
                {questionFields}
            </Col>


            <Col xs={12}>
                <Divider
                    my="xl"
                    labelPosition="center"
                    label={
                        <Flex
                            direction={{base: "column", md: "row"}}
                            justify="center"
                            align="center"
                            gap="xs"
                        >
                            <Button
                                shadow
                                color="secondary"
                                onPress={() => form.removeListItem("questions", form.values.questions.length - 1)}
                            >
                                Select existing
                            </Button>
                            {mdMediaMatch ? (
                                <Divider orientation="horizontal" mx="xs" />
                            ) : (
                                <Divider orientation="vertical" mx="xs" />
                            )}

                            <Title order={3}>Questions ({form.values.questions.length})</Title>

                            {mdMediaMatch ? (
                                <Divider orientation="horizontal" mx="xs" />
                            ) : (
                                <Divider orientation="vertical" mx="xs" />
                            )}
                            <Button
                                shadow
                                color="secondary"
                                onPress={() => form.insertListItem("questions", QuestionPost.initialize())}
                            >
                                Add new
                            </Button>
                        </Flex>
                    }
                />
            </Col>

            <Text size="sm" weight={500} mt="md">
                Form values:
            </Text>
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </Grid>
    );
};
