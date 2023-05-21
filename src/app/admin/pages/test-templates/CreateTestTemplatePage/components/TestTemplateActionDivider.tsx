import {Divider, Flex, Title} from "@mantine/core";
import {Button, Dropdown} from "@nextui-org/react";
import {IQuestion, QuestionPostFormModel} from "@models/education/test-template/question";
import {useTestTemplateFormContext} from "@app.admin/context/testTemplateFormContext";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";

interface Props {
    existingQuestions: IQuestion[];
    setExistingQuestions: (questions: IQuestion[]) => void;
}

export const TestTemplateActionDivider = ({existingQuestions, setExistingQuestions}: Props) => {
    const mdMediaMatch = useMediaQuery(`(max-width: ${breakpoints.md})`);
    const form = useTestTemplateFormContext();

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
                                form.insertListItem("questions", QuestionPostFormModel.fromQuestion(question));
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
                    <Title order={3}>Questions ({form.values.questions.length})</Title>
                    {mdMediaMatch ? (
                        <Divider orientation="horizontal" mx="xs" />
                    ) : (
                        <Divider orientation="vertical" mx="xs" />
                    )}
                    <Button
                        auto
                        shadow
                        color="secondary"
                        onPress={() => form.insertListItem("questions", QuestionPostFormModel.initialize())}
                    >
                        Add new question
                    </Button>
                </Flex>
            }
        />
    );
};