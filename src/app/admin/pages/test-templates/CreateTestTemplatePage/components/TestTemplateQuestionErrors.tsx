import {memo} from "react";
import {Text} from "@mantine/core";
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";
import {IQuestionPostFormModel} from "@models/education/test-template/question";

interface Props {
    questionErrors: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<IQuestionPostFormModel>> | undefined)[]> | undefined;
    index: number;
}

export const TestTemplateQuestionErrors = memo(({questionErrors, index}: Props) => {
    if (!questionErrors) {
        return null;
    }

    return (
        <>
            {[
                /* @ts-ignore */
                questionErrors[index]?.text?.message &&
                <Text key="text" color="red.6" size="xs" fw={500}>
                    {/* @ts-ignore */}
                    {questionErrors[index]?.text?.message}
                </Text>,
                /* @ts-ignore */
                questionErrors[index]?.languageLevel?.message &&
                <Text key="level" color="red.6" size="xs" fw={500}>
                    {/* @ts-ignore */}
                    {questionErrors[index]?.languageLevel?.message}
                </Text>,
                /* @ts-ignore */
                questionErrors[index]?.category?.message &&
                <Text key="category" color="red.6" size="xs" fw={500}>
                    {/* @ts-ignore */}
                    {questionErrors[index]?.category?.message}
                </Text>,
                /* @ts-ignore */
                questionErrors[index]?.answers?.some(answerError => answerError?.text) &&
                <Text key="answerText" color="red.6" size="xs" fw={500}>
                    Answer text is required.
                </Text>,
                /* @ts-ignore */
                questionErrors[index]?.answers?.some(answerError => answerError?.correct) &&
                <Text key="answerCorrect" color="red.6" size="xs" fw={500}>
                    Correct answer is required.
                </Text>
            ]}
        </>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.questionErrors === nextProps.questionErrors &&
        prevProps.index === nextProps.index
    );
});