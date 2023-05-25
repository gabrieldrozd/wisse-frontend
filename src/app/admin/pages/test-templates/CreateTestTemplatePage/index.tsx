import {useCallback, useEffect, useState} from "react";
import {motion, Variants} from "framer-motion";
import {Affix, Col, Divider, Grid, Group, rem, Title, Transition} from "@mantine/core";
import {Button} from "@nextui-org/react";
import {uuid} from "@utils/uuidUtils";
import {levels} from "@const/education";
import {IQuestion, IQuestionPostFormModel} from "@models/education/test-template/question";
import {useQuestionSlice} from "@store/slices/education/question/questionSlice";
import {TestTemplateQuestionsGrid} from "./components/TestTemplateQuestionsGrid";
import {TestTemplateFormFields} from "@app.admin/pages/test-templates/CreateTestTemplatePage/components/TestTemplateFormFields";
import {TestTemplateActionDivider} from "@app.admin/pages/test-templates/CreateTestTemplatePage/components/TestTemplateActionDivider";
import {ITestTemplatePostFormModel, TestTemplatePost} from "@models/education/test-template/testTemplate";
import {useTestTemplateSlice} from "@store/slices/education/test-template/testTemplateSlice";
import {FormProvider, SubmitHandler, useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {SubmitErrorHandler} from "react-hook-form/dist/types/form";
import {useWindowScroll} from "@mantine/hooks";
import {IconArrowUp} from "@tabler/icons-react";

const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    languageLevel: z.string().nonempty("Language level is required"),
    questions: z.array(
        z.object({
            text: z.string().nonempty("Question text is required"),
            languageLevel: z.string().nonempty("Question language level is required"),
            category: z.string().nonempty("Question category is required"),
            answers: z.array(
                z.object({
                    text: z.string().nonempty("Answer text is required"),
                    correct: z.boolean()
                })
            ).refine(answers => answers.length >= 2, {
                message: "At least 2 answers are required"
            })
        })
    ).refine(questions => questions.length >= 5, {
        message: "At least 5 questions are required"
    })
});

export const CreateTestTemplatePage = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const {actions: questionActions} = useQuestionSlice();
    const {actions: testTemplateActions} = useTestTemplateSlice();
    const [testLevel, setTestLevel] = useState(levels[0].value);
    const [existingQuestions, setExistingQuestions] = useState<IQuestion[]>([]);

    const testTemplateForm = useForm<ITestTemplatePostFormModel>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldUnregister: false,
        defaultValues: {
            externalId: uuid(),
            name: "",
            description: "",
            languageLevel: levels[0].value,
            questions: [] as IQuestionPostFormModel[],
        },
        resolver: zodResolver(formSchema),
    });

    const formControl = useCallback(() => testTemplateForm.control, [testTemplateForm.control]);
    const setValue = useCallback((name: string, value: any) => testTemplateForm.setValue(name as any, value), [testTemplateForm]);
    const testTemplateErrors = useCallback(() => testTemplateForm.formState.errors, [testTemplateForm.formState.errors]);

    const questionsWatch = useWatch({control: formControl(), name: "questions"});
    const languageLevelWatch = useWatch({control: formControl(), name: "languageLevel"});

    const buttonVariants: Variants = {
        initial: {scale: 1, opacity: 1},
        animate: {scale: [1, 1.1, 1], opacity: [1, 0.8, 1]}
    };

    useEffect(() => {
        setTestLevel(languageLevelWatch);
    }, [languageLevelWatch]);

    const fetchExistingQuestions = useCallback(async () => {
        const questions = await questionActions.browseQuestionsByLevel(testLevel);
        return questions.list.filter((question) => !questionsWatch
            .some((existingQuestion) => existingQuestion.externalId === question.externalId));
    }, [questionActions, testLevel, questionsWatch]);

    useEffect(() => {
        fetchExistingQuestions().then(questions => setExistingQuestions(questions));
    }, [testLevel]);

    const onValidSubmit: SubmitHandler<ITestTemplatePostFormModel> = (data) => {
        console.log("[VALID SUBMIT] testTemplateModel: ", data);
        const testTemplateModel = TestTemplatePost.fromFormModel(data);

        testTemplateActions.createTestTemplate(testTemplateModel).then(() => {
            console.log("Test template created successfully");
        });
    };
    const onInvalidSubmit: SubmitErrorHandler<ITestTemplatePostFormModel> = (data) => {
        console.log("[INVALID SUBMIT] testTemplateModel: ", data);
    };

    const onSubmit = testTemplateForm.handleSubmit(onValidSubmit, (errors) => onInvalidSubmit(errors));

    return (
        <>
            <FormProvider {...testTemplateForm}>
                <Grid mx="auto" grow>
                    <Col
                        xs={12}
                        md={6}
                        children={
                            <TestTemplateFormFields
                                formControl={formControl()}
                                testTemplateErrors={testTemplateErrors()}
                                setValue={setValue}
                                languageLevel={testLevel}
                            />
                        }
                    />
                    <Col xs={12}>
                        <Divider
                            labelPosition="center"
                            label={
                                <Title order={3}>
                                    Questions ({questionsWatch.length})
                                </Title>
                            }
                        />
                    </Col>
                    <Col
                        xs={12}
                        children={
                            <TestTemplateQuestionsGrid
                                formControl={formControl()}
                                questionErrors={testTemplateErrors().questions}
                            />
                        }
                    />
                    <Col
                        xs={12}
                        children={
                            <TestTemplateActionDivider
                                setValue={setValue}
                                questions={questionsWatch}
                                questionsCount={questionsWatch.length}
                                existingQuestions={existingQuestions}
                                setExistingQuestions={setExistingQuestions}
                            />
                        }
                    />
                </Grid>
                <Affix position={{bottom: rem(20), right: rem(20)}}>
                    <Group>
                        <Transition transition="scale" mounted>
                            {(transitionStyles) => (
                                <Button
                                    auto
                                    style={transitionStyles}
                                    onPress={() => scrollTo({y: scroll.y > 0 ? 0 : document.body.scrollHeight})}
                                >
                                    <motion.div
                                        animate={{rotate: scroll.y > 0 ? "0deg" : "180deg"}}
                                        transition={{duration: 0.5}}
                                        style={{display: "inline-flex", transformOrigin: "center"}}
                                    >
                                        <IconArrowUp size="1.5rem" />
                                    </motion.div>
                                </Button>
                            )}
                        </Transition>

                        <motion.div
                            variants={buttonVariants}
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
                            <Button auto shadow size="lg" onPress={() => onSubmit()}>
                                Submit test template
                            </Button>
                        </motion.div>
                    </Group>
                </Affix>
            </FormProvider>
        </>
    );
};