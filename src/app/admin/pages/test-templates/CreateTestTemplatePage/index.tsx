import {FormEvent, useCallback, useEffect, useState} from "react";
import {motion, Variants} from "framer-motion";
import {Affix, Col, Divider, Grid, rem, Title} from "@mantine/core";
import {Button} from "@nextui-org/react";
import {uuid} from "@utils/uuidUtils";
import {levels} from "@const/education";
import {IQuestion, IQuestionPostFormModel} from "@models/education/test-template/question";
import {useQuestionSlice} from "@store/slices/education/question/questionSlice";
import {TestTemplateFormProvider, useTestTemplateForm} from "@app.admin/context/testTemplateFormContext";
import {TestTemplateQuestionsGrid} from "./components/TestTemplateQuestionsGrid";
import {TestTemplateFormFields} from "@app.admin/pages/test-templates/CreateTestTemplatePage/components/TestTemplateFormFields";
import {TestTemplateActionDivider} from "@app.admin/pages/test-templates/CreateTestTemplatePage/components/TestTemplateActionDivider";
import {ITestTemplatePostFormModel, TestTemplatePost} from "@models/education/test-template/testTemplate";
import {useTestTemplateSlice} from "@store/slices/education/test-template/testTemplateSlice";
import {useForm, isNotEmpty, isEmail, isInRange, hasLength, matches} from "@mantine/form";

export const CreateTestTemplatePage = () => {
    const {actions: questionActions} = useQuestionSlice();
    const {actions: testTemplateActions} = useTestTemplateSlice();

    const [testLevel, setTestLevel] = useState(levels[0].value);
    const [existingQuestions, setExistingQuestions] = useState<IQuestion[]>([]);

    /*
    *    TODO: Migrate MantineForm to react-hook-form
    *    TODO: Add zod validation to react-hook-form
    *    Use react-hook-form by passing form (reagiter property) to child components ***???***
    *
    *    Get more into react-hook-form CONTEXT (ask chat how to distinguish contexts if the hook is called useFormContext ???)
    */

    const form = useTestTemplateForm({
        initialValues: {
            externalId: uuid(),
            name: "",
            description: "",
            languageLevel: levels[0].value,
            questions: [] as IQuestionPostFormModel[],
        },
        validate: {
            name: (value) => isNotEmpty(value) ? null : "Name is required",
            description: (value) => isNotEmpty(value) ? null : "Description is required",
            languageLevel: (value) => isNotEmpty(value) ? null : "Language level is required",
            questions: (value) => {
                if (value.length < 5) return "At least 5 questions are required";
                value.forEach((question) => {
                    if (!isNotEmpty(question.text))
                        return `Question text is required`;
                    if (!isNotEmpty(question.languageLevel))
                        return `Question language level is required`;
                    if (!isNotEmpty(question.category))
                        return `Question category is required`;
                    if (question.answers.length != 4)
                        return `Question should have 4 answers`;
                    if (question.answers.filter((answer) => answer.correct).length != 1)
                        return `Question should have only one correct answer`;
                    question.answers.forEach((answer) => {
                        if (!isNotEmpty(answer.text))
                            return `Answer text is required`;
                    });
                });
            }
        }
    });

    const iconVariants: Variants = {
        initial: {
            scale: 1,
            opacity: 1
        },
        animate: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1]
        }
    };

    useEffect(() => {
        setTestLevel(form.values.languageLevel);
    }, [form.values.languageLevel]);

    const fetchExistingQuestions = useCallback(async () => {
        const questions = await questionActions.browseQuestionsByLevel(testLevel);
        return questions.list.filter((question) => !form.values.questions
            .some((existingQuestion) => existingQuestion.externalId === question.externalId));
    }, [questionActions, testLevel, form.values.questions]);

    useEffect(() => {
        fetchExistingQuestions()
            .then((questions) => {
                setExistingQuestions(questions);
            });
    }, [testLevel]);

    useEffect(() => {
        console.log("errors: ", form.errors);
    }, [form.values]);

    const handleFormSubmit = async (
        values: ReturnType<(values: ITestTemplatePostFormModel) => ITestTemplatePostFormModel>,
        event: FormEvent<HTMLFormElement>
    ) => {
        console.log("values: ", values);

        const testTemplateData = TestTemplatePost.fromFormModel(form.values);

        console.log("testTemplateData: ", testTemplateData);

        // testTemplateActions.createTestTemplate(testTemplateData).then(result => {
        //     if (result) {
        //         form.reset();
        //     }
        // });
    };

    return (
        <TestTemplateFormProvider form={form}>
            <form onSubmit={form.onSubmit((values, event) => handleFormSubmit(values, event))}>
                <Grid mx="auto" grow>
                    <Col xs={12} md={6} children={<TestTemplateFormFields />} />
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
                    <Col xs={12} children={<TestTemplateQuestionsGrid />} />
                    <Col
                        xs={12}
                        children={
                            <TestTemplateActionDivider
                                existingQuestions={existingQuestions}
                                setExistingQuestions={setExistingQuestions}
                            />
                        }
                    />
                </Grid>
                <Affix position={{bottom: rem(20), right: rem(20)}}>
                    <motion.div
                        variants={iconVariants}
                        initial="initial"
                        animate={"animate"}
                        transition={{
                            loop: Infinity,
                            duration: 0.75,
                            ease: "linear",
                            times: [0, 0.2, 0.6],
                            repeatDelay: 2,
                            repeat: Infinity
                        }}
                    >
                        <Button auto shadow size="lg" type="submit">
                            Submit test template
                        </Button>
                    </motion.div>
                </Affix>
            </form>
        </TestTemplateFormProvider>
    );
};
