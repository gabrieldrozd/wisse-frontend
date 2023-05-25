import {memo} from "react";
import {Divider, Flex, Title} from "@mantine/core";
import {Button, Dropdown} from "@nextui-org/react";
import {IQuestion, IQuestionPostFormModel, QuestionPostFormModel} from "@models/education/test-template/question";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";

interface Props {
    setValue: (name: string, value: any) => void;
    questions: IQuestionPostFormModel[];
    questionsCount: number;
    existingQuestions: IQuestion[];
    setExistingQuestions: (questions: IQuestion[]) => void;
}

export const TestTemplateActionDivider = memo(({setValue, questions, questionsCount, existingQuestions, setExistingQuestions}: Props) => {
    const mdMediaMatch = useMediaQuery(`(max-width: ${breakpoints.md})`);

    console.log(questionsCount);

    return (
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
                    <Dropdown>
                        <Dropdown.Button shadow color="secondary">Select existing</Dropdown.Button>
                        <Dropdown.Menu
                            color="secondary"
                            selectionMode="single"
                            items={existingQuestions}
                            onAction={(externalId) => {
                                const question = existingQuestions.find((question) => question.externalId === externalId);
                                if (!question) return;

                                const questionToRemove = existingQuestions.findIndex((question) => question.externalId === externalId);
                                setExistingQuestions(existingQuestions.filter((question, index) => index !== questionToRemove));
                                questions.push(QuestionPostFormModel.fromQuestion(question));
                                setValue("questions", questions);
                            }}
                        >
                            {existingQuestions && existingQuestions.map((question) => (
                                <Dropdown.Item key={question.externalId}>
                                    {question.text}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {mdMediaMatch ? (
                        <Divider orientation="horizontal" mx="xs" />
                    ) : (
                        <Divider orientation="vertical" mx="xs" />
                    )}
                    <Title order={3}>Questions ({questionsCount})</Title>
                    {mdMediaMatch ? (
                        <Divider orientation="horizontal" mx="xs" />
                    ) : (
                        <Divider orientation="vertical" mx="xs" />
                    )}
                    <Button
                        auto
                        shadow
                        color="secondary"
                        onPress={() => {
                            questions.push(QuestionPostFormModel.initialize());
                            setValue("questions", questions);
                        }}
                    >
                        Add new question
                    </Button>
                </Flex>
            }
        />
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.setValue === nextProps.setValue &&
        prevProps.questions === nextProps.questions &&
        prevProps.questionsCount === nextProps.questionsCount &&
        prevProps.existingQuestions.length === nextProps.existingQuestions.length &&
        prevProps.setExistingQuestions === nextProps.setExistingQuestions
    );
});