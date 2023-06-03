import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {EnrollPageButtons} from "@app.start/pages/EnrollPage/components/EnrollPageButtons";
import {StepApplicantDetails} from "@app.start/pages/EnrollPage/StepApplicantDetails";
import {StepEnrollmentSummary} from "@app.start/pages/EnrollPage/StepEnrollmentSummary";
import {StepIntroduction} from "@app.start/pages/EnrollPage/StepIntroduction";
import {StepLevelAssessment} from "@app.start/pages/EnrollPage/StepLevelAssessment";
import classes from "@app.start/pages/EnrollPage/styles/EnrollPage.module.scss";
import {breakpoints} from "@const/breakpoints";
import {schools} from "@const/education";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Container, Group, Stepper} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import type {IEnrollmentPost, IEnrollmentPostFormModel} from "@models/enrollment/IEnrollmentPost";
import {useTestSlice} from "@store/slices/education/test/testSlice";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {useCallback, useState} from "react";
import type {SubmitHandler} from "react-hook-form";
import {FormProvider, useForm} from "react-hook-form";
import type {SubmitErrorHandler} from "react-hook-form/dist/types/form";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {Notify} from "@services/Notify";

const formSchema = z.object({
    applicant: z.object({
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        birthDate: z.string().nonempty("Birth date is required"),
        school: z.string().nonempty("School is required"),
        grade: z.string().nonempty("Grade is required"),
        levelKey: z.string().nonempty("Level is required"),
    }),
    contact: z.object({
        email: z.string().email("Invalid email address").nonempty("Email is required"),
        phoneNumber: z.string().nonempty("Phone number is required"),
        zipCode: z.string().nonempty("Zip code is required"),
        zipCodeCity: z.string().nonempty("Zip code city is required"),
        state: z.string().nonempty("State is required"),
        city: z.string().nonempty("City is required"),
        street: z.string().nonempty("Street is required"),
        houseNumber: z.string().nonempty("House number is required"),
    })
});

export const EnrollPage = () => {
    const mediaMatch = useMediaQuery(`(max-width: ${breakpoints.lg_xl})`);
    const mobileWidth = mediaMatch ? "100%" : "80rem";
    const marginValue = mediaMatch ? 0 : 50;

    const {isTestCompleted} = useEnrollPageContext();
    const {actions: enrollActions, selectors} = useEnrollmentSlice();
    const {selectors: {currentTestResult}} = useTestSlice();
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 1);
    const maxDateStr = maxDate.toString().split("T")[0];

    const persistedForm = selectors.enrollmentForm();
    const enrollmentForm = useForm<IEnrollmentPostFormModel>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            applicant: {
                firstName: persistedForm?.applicant?.firstName || "",
                lastName: persistedForm?.applicant?.lastName || "",
                birthDate: persistedForm?.applicant?.birthDate || maxDateStr,
                school: persistedForm?.applicant?.school || schools[0].value,
                grade: persistedForm?.applicant?.grade || schools[0].grades[0],
                levelKey: persistedForm?.applicant?.levelKey || "",
            },
            contact: {
                email: persistedForm?.contact?.email || "",
                phoneNumber: persistedForm?.contact?.phoneNumber || "",
                zipCode: persistedForm?.contact?.zipCode || "",
                zipCodeCity: persistedForm?.contact?.zipCodeCity || "",
                state: persistedForm?.contact?.state || "",
                city: persistedForm?.contact?.city || "",
                street: persistedForm?.contact?.street || "",
                houseNumber: persistedForm?.contact?.houseNumber || "",
            }
        },
        resolver: zodResolver(formSchema)
    });

    const formControl = useCallback(() => enrollmentForm.control, [enrollmentForm.control]);

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;
        if (isOutOfBounds) return;
        setActive(nextStep);
    };

    const onValidSubmit: SubmitHandler<IEnrollmentPostFormModel> = (data) => {
        console.log("[VALID SUBMIT] enrollmentForm: ", data);

        const model: IEnrollmentPost = {
            applicant: {
                firstName: data.applicant.firstName,
                lastName: data.applicant.lastName,
                birthDate: new Date(data.applicant.birthDate),
                school: data.applicant.school,
                grade: data.applicant.grade,
                levelKey: data.applicant.levelKey,
            },
            contact: {
                email: data.contact.email,
                phoneNumber: data.contact.phoneNumber,
                zipCode: data.contact.zipCode,
                zipCodeCity: data.contact.zipCodeCity,
                state: data.contact.state,
                city: data.contact.city,
                street: data.contact.street,
                houseNumber: data.contact.houseNumber,
            }
        };

        if (isTestCompleted && currentTestResult()) {
            data.testResult = currentTestResult()!;
        }

        enrollActions.submit(model).then(result => {
            if (result) {
                enrollmentForm.reset();
                navigate("/");
            }
        });
    };
    const onInvalidSubmit: SubmitErrorHandler<IEnrollmentPostFormModel> = (data) => {
        console.log("[INVALID SUBMIT] enrollmentForm: ", data);
        Notify.info("Please fill in all required fields");
    };

    const onSubmit = enrollmentForm.handleSubmit(onValidSubmit, (errors) => onInvalidSubmit(errors));

    return (
        <Container size="xl" w={mobileWidth}>
            <Box mt={40}>
                <Container size="xl" className={classes.rootContainer}>
                    <FormProvider {...enrollmentForm}>
                        <Stepper
                            pt={20}
                            size="lg"
                            color="indigo.5"
                            active={active}
                            onStepClick={setActive}
                            orientation={mediaMatch ? "vertical" : "horizontal"}
                        >
                            <Stepper.Step
                                ml={marginValue}
                                label="Introduction"
                                description="Before you start"
                                allowStepSelect={false}
                            >
                                <StepIntroduction />
                            </Stepper.Step>

                            <Stepper.Step
                                label="Step 1"
                                description="Applicant details"
                                allowStepSelect={false}
                            >
                                <StepApplicantDetails formControl={formControl()} />
                            </Stepper.Step>

                            <Stepper.Step
                                label="Step 2"
                                description="Level Assessment"
                                allowStepSelect={false}
                            >
                                <StepLevelAssessment />
                            </Stepper.Step>

                            <Stepper.Step
                                mr={marginValue}
                                label="Step 3"
                                description="Enrollment summary"
                                allowStepSelect={false}
                            >
                                <StepEnrollmentSummary formControl={formControl()} />
                            </Stepper.Step>
                        </Stepper>
                    </FormProvider>

                    <Group position="center" p={20}>
                        <EnrollPageButtons
                            active={active}
                            handleStepChange={handleStepChange}
                            onSubmit={onSubmit}
                        />
                    </Group>
                </Container>
            </Box>
        </Container>
    );
};