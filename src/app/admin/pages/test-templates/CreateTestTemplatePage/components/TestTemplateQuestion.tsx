import {memo, useCallback} from "react";
import {Col, Divider, Flex, Grid, Select, Text, Title} from "@mantine/core";
import {Button} from "@nextui-org/react";
import {MdAdd, MdDelete} from "react-icons/all";
import {colors} from "@const/colors";
import {categories, levels} from "@const/education";
import {Control, Controller, FieldError, FieldErrorsImpl, Merge} from "react-hook-form";
import {ITestTemplatePostFormModel} from "@models/education/testTemplate";
import {IQuestionPostFormModel} from "@models/education/question";
import {TestTemplateQuestionErrors} from "./TestTemplateQuestionErrors";
import {TestTemplateQuestionAnswer} from "./TestTemplateQuestionAnswer";
import {SpellCheckDebouncedInput} from "@components/form/SpellCheckDebouncedInput";

interface Props {
    formControl: Control<ITestTemplatePostFormModel>;
    questionErrors: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<IQuestionPostFormModel>> | undefined)[]> | undefined;
    index: number;
    question: IQuestionPostFormModel;
    handleAppendQuestion: () => void;
    handleRemoveQuestion: (index: number) => void;
}

export const TestTemplateQuestion = memo((
    {formControl, questionErrors, index, question, handleAppendQuestion, handleRemoveQuestion}: Props
) => {
    const QuestionAnswers = useCallback(() => {
        return question.answers && question.answers.map((answer, answerIndex) => (
            <TestTemplateQuestionAnswer
                key={answer.externalId}
                formControl={formControl}
                questionIndex={index}
                question={question}
                answerIndex={answerIndex}
                answer={answer}
            />
        ));
    }, [formControl, index, question]);

    return (
        <Grid mx="auto" style={question.existing ? {backgroundColor: "#f5f5f5", borderRadius: 20, margin: "20px 0"} : {}}>
            <Col xs={12}>
                <Divider
                    my="xs"
                    labelPosition="right"
                    label={
                        <Flex align="center" justify="center">
                            <Text size="md" fw={500} color="indigo.5" mx={20}>{`Question #${index + 1}`}</Text>
                            <Button
                                auto
                                shadow
                                color="secondary"
                                css={{marginLeft: 10}}
                                iconRight={<MdAdd size="20px" />}
                                onPress={handleAppendQuestion}
                            />
                            <Button
                                auto
                                shadow
                                color="warning"
                                css={{marginLeft: 10}}
                                iconRight={<MdDelete size="20px" />}
                                onPress={() => handleRemoveQuestion(index)}
                            />
                        </Flex>
                    }
                />
            </Col>

            <Col xs={12} lg={7} w="100%">
                <SpellCheckDebouncedInput
                    required
                    textarea={true}
                    formControl={formControl}
                    name={`questions.${index}.text`}
                    defaultValue={question.text}
                    mb={20}
                    size="md"
                    minRows={3}
                    radius="lg"
                    variant="filled"
                    label={`(${index + 1}) Question text`}
                    placeholder="Enter question text"
                    disabled={question.existing}
                />

                <Controller
                    name={`questions.${index}.languageLevel`}
                    control={formControl}
                    defaultValue={question.languageLevel}
                    render={({field}) => (
                        <Select
                            mb={20}
                            size="md"
                            data={levels}
                            label="Level"
                            radius="lg"
                            variant="filled"
                            placeholder="Select question level"
                            required
                            disabled={question.existing}
                            {...field}
                            styles={{
                                item: {
                                    "&[data-selected]": {
                                        "&, &:hover": {
                                            backgroundColor: colors.indigo500,
                                            color: colors.white,
                                        },
                                    },
                                },
                            }}
                        />
                    )}
                />

                <Controller
                    name={`questions.${index}.category`}
                    control={formControl}
                    defaultValue={question.category}
                    render={({field}) => (
                        <Select
                            size="md"
                            data={categories}
                            label="Category"
                            radius="lg"
                            variant="filled"
                            placeholder="Select question category"
                            required
                            disabled={question.existing}
                            {...field}
                            styles={{
                                item: {
                                    "&[data-selected]": {
                                        "&, &:hover": {
                                            backgroundColor: colors.indigo500,
                                            color: colors.white,
                                        },
                                    },
                                },
                            }}
                        />
                    )}
                />
            </Col>

            <Col xs={12} lg={5} w="100%">
                {question.answers && QuestionAnswers()}
            </Col>

            <Col xs={12} w="100%">
                <TestTemplateQuestionErrors
                    questionErrors={questionErrors}
                    index={index}
                />
            </Col>

            <Col xs={12}>
                <Button
                    auto
                    size="md"
                    color="warning"
                    css={{width: "100%"}}
                    iconRight={<MdDelete size="30px" />}
                    onPress={() => handleRemoveQuestion(index)}
                >
                    <Title order={4}>Remove</Title>
                </Button>
            </Col>
        </Grid>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.formControl === nextProps.formControl &&
        prevProps.questionErrors === nextProps.questionErrors &&
        prevProps.index === nextProps.index &&
        prevProps.question === nextProps.question &&
        prevProps.handleAppendQuestion === nextProps.handleAppendQuestion &&
        prevProps.handleRemoveQuestion === nextProps.handleRemoveQuestion
    );
});