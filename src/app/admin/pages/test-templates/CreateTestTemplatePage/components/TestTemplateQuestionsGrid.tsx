import {TestTemplateQuestion} from "@app.admin/pages/test-templates/CreateTestTemplatePage/components/TestTemplateQuestion";
import {Group, Text} from "@mantine/core";
import type {IQuestionPostFormModel} from "@models/education/question";
import {QuestionPostFormModel} from "@models/education/question";
import type {ITestTemplatePostFormModel} from "@models/education/testTemplate";
import {memo, useCallback} from "react";
import type {Control, Merge, FieldError, FieldErrorsImpl} from "react-hook-form";
import {useFieldArray} from "react-hook-form";

interface Props {
    formControl: Control<ITestTemplatePostFormModel>,
    questionErrors: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<IQuestionPostFormModel>> | undefined)[]> | undefined
}

export const TestTemplateQuestionsGrid = memo(function TestTemplateQuestionsGrid({formControl, questionErrors}: Props) {
    const {fields: questions, append: appendQuestion, remove: removeQuestion} = useFieldArray({
        control: formControl,
        name: "questions",
    });

    const handleAppendQuestion = useCallback(() => {
        appendQuestion(QuestionPostFormModel.initialize());
    }, [appendQuestion]);

    const handleRemoveQuestion = useCallback((index: number) => {
        removeQuestion(index);
    }, [removeQuestion]);

    const QuestionsList = useCallback(() => {
        return questions.map((question, index) => (
            <TestTemplateQuestion
                formControl={formControl}
                questionErrors={questionErrors}
                key={question.id}
                index={index}
                question={question}
                handleAppendQuestion={handleAppendQuestion}
                handleRemoveQuestion={handleRemoveQuestion}
            />
        ));
    }, [questions, formControl, questionErrors, handleAppendQuestion, handleRemoveQuestion]);

    return (
        <>
            {questionErrors && (
                <Group position="center">
                    <Text color="red.6" size="md" fw={500}>
                        {questionErrors.message}
                    </Text>
                </Group>
            )}
            {questions.length > 0 && QuestionsList()}
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.formControl === nextProps.formControl &&
        prevProps.questionErrors === nextProps.questionErrors
    );
});