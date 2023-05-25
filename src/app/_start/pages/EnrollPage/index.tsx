import {Box, Container, Group, Stepper} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {breakpoints} from "@const/breakpoints";
import classes from "@app.start/pages/EnrollPage/components/styles/EnrollStepper.module.scss";
import {EnrollmentFormProvider, useEnrollmentForm} from "@app.start/context/enrollFormContext";
import {StepIntroduction} from "@app.start/pages/EnrollPage/components/StepIntroduction";
import {StepApplicantDetails} from "@app.start/pages/EnrollPage/components/StepApplicantDetails";
import {StepEnrollmentSummary} from "@app.start/pages/EnrollPage/components/StepEnrollmentSummary";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {schools} from "@const/education";
import {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import {EnrollPageButtons} from "@app.start/pages/EnrollPage/components/EnrollPageButtons";
import {z} from "zod";
import {StepLevelAssessment} from "@app.start/pages/EnrollPage/components/StepLevelAssessment";

const formSchema = z.object({
    applicant: z.object({
        firstName: z.string().nonempty("First name is required"),
        lastName: z.string().nonempty("Last name is required"),
        birthDate: z.date().max(new Date(), "Birth date cannot be in the future"),
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

    const {actions: enrollActions} = useEnrollmentSlice();
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const enrollmentForm = useEnrollmentForm({
        initialValues: {
            applicant: {
                firstName: "",
                lastName: "",
                birthDate: new Date(),
                school: schools[0].value,
                grade: schools[0].grades[0],
                levelKey: "",
            },
            contact: {
                email: "",
                phoneNumber: "",
                zipCode: "",
                zipCodeCity: "",
                state: "",
                city: "",
                street: "",
                houseNumber: "",
            }
        },
        validate: (values: EnrollmentPost) => {
            const errors: Record<string, string> = {};
            if (!values.applicant.firstName) errors["applicant.firstName"] = "First name is required";
            if (!values.applicant.lastName) errors["applicant.lastName"] = "Last name is required";
            if (!values.applicant.birthDate) errors["applicant.birthDate"] = "Birth date is required";
            if (!values.applicant.school) errors["applicant.school"] = "School is required";
            if (!values.applicant.grade) errors["applicant.grade"] = "Grade is required";
            if (!values.applicant.levelKey) errors["applicant.levelKey"] = "Level is required";
            if (!values.contact.email) errors["contact.email"] = "Email is required";
            if (!values.contact.phoneNumber) errors["contact.phoneNumber"] = "Phone number is required";
            if (!values.contact.zipCode) errors["contact.zipCode"] = "Zip code is required";
            if (!values.contact.zipCodeCity) errors["contact.zipCodeCity"] = "Zip code city is required";
            if (!values.contact.state) errors["contact.state"] = "State is required";
            if (!values.contact.city) errors["contact.city"] = "City is required";
            if (!values.contact.houseNumber) errors["contact.houseNumber"] = "House number is required";
            return errors;
        }
    });

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;
        if (isOutOfBounds) return;
        setActive(nextStep);
    };

    const isFormValid = enrollmentForm.isValid("applicant") && enrollmentForm.isValid("contact");

    const handleSubmit = (values: EnrollmentPost) => {
        enrollActions.submit(values).then(result => {
            if (result) {
                enrollmentForm.reset();
                navigate("/");
            }
        });
    };

    return (
        <Container size="xl" w={mobileWidth}>
            <Box mt={40}>
                <Container size="xl" className={classes.rootContainer}>
                    <EnrollmentFormProvider form={enrollmentForm}>
                        <form>
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
                                    <StepApplicantDetails />
                                </Stepper.Step>

                                <Stepper.Step
                                    label="Step 2"
                                    description="Level Assessment"
                                    allowStepSelect={true}
                                >
                                    <StepLevelAssessment />
                                </Stepper.Step>

                                <Stepper.Step
                                    mr={marginValue}
                                    label="Step 3"
                                    description="Enrollment summary"
                                    allowStepSelect={false}
                                >
                                    <StepEnrollmentSummary />
                                </Stepper.Step>
                            </Stepper>
                        </form>
                    </EnrollmentFormProvider>

                    <Group position="center" p={20}>
                        <EnrollPageButtons
                            active={active}
                            enrollmentForm={enrollmentForm}
                            isFormValid={isFormValid}
                            handleStepChange={handleStepChange}
                            handleSubmit={handleSubmit}
                        />
                    </Group>
                </Container>
            </Box>
        </Container>
    );
};