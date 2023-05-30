import {memo} from "react";
import {Flex, Switch} from "@mantine/core";
import {Control, Controller} from "react-hook-form";
import {MdCheckCircle, MdHighlightOff} from "react-icons/all";
import {IAnswerPost} from "@models/education/answer";
import {IQuestionPostFormModel} from "@models/education/question";
import {ITestTemplatePostFormModel} from "@models/education/testTemplate";
import {DebouncedInput} from "@components/form/DebouncedInput";

interface Props {
    formControl: Control<ITestTemplatePostFormModel>;
    questionIndex: number;
    question: IQuestionPostFormModel;
    answerIndex: number;
    answer: IAnswerPost;
}

export const TestTemplateQuestionAnswer = memo((
    {formControl, questionIndex, question, answerIndex, answer}: Props
) => {
    return (
        <Flex direction="row" align="center" justify="center" mb={9} gap={10}>
            <DebouncedInput
                required
                formControl={formControl}
                name={`questions.${questionIndex}.answers.${answerIndex}.text`}
                defaultValue={answer.text}
                w={"100%"}
                size="md"
                radius="lg"
                variant="filled"
                label={`(${answerIndex+1}) Answer text`}
                placeholder="Enter answer text"
                disabled={question.existing}
            />

            <Controller
                name={`questions.${questionIndex}.answers.${answerIndex}.correct`}
                control={formControl}
                defaultValue={answer.correct}
                render={({field}) => (
                    // @ts-ignore
                    <Switch
                        mt="25px"
                        size="lg"
                        required
                        color="indigo.5"
                        disabled={question.existing}
                        onLabel={<MdCheckCircle size="25px" style={{margin: "10px"}} />}
                        offLabel={<MdHighlightOff size="25px" style={{margin: "10px"}} />}
                        checked={field.value}
                        {...field}
                    />
                )}
            />
        </Flex>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.formControl === nextProps.formControl &&
        prevProps.questionIndex === nextProps.questionIndex &&
        prevProps.answerIndex === nextProps.answerIndex &&
        prevProps.question === nextProps.question &&
        prevProps.answer === nextProps.answer
    );
});