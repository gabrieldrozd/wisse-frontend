import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {Container, Group, Stepper} from "@mantine/core";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons-react";
import {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import {breakpoints} from "@const/breakpoints";
import {schools} from "@const/education";
import classes from "./styles/EnrollStepper.module.scss";
import {EnrollmentFormProvider, useEnrollmentForm} from "@app.start/context/enrollFormContext";
import {StepIntroduction} from "@app.start/pages/EnrollPage/components/StepIntroduction";
import {StepApplicantDetails} from "@app.start/pages/EnrollPage/components/StepApplicantDetails";
import {StepEnrollmentSummary} from "@app.start/pages/EnrollPage/components/StepEnrollmentSummary";
import {Button} from "@components/Button";

export const EnrollStepper = () => {
    const {actions: enrollActions} = useEnrollmentSlice();
    const navigate = useNavigate();
    const mediaMatch = useMediaQuery(`(max-width: ${breakpoints.lg_xl})`);
    const marginValue = mediaMatch ? 0 : 50;
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
        const isOutOfBounds = nextStep > 2 || nextStep < 0;
        if (isOutOfBounds) return;
        setActive(nextStep);
    };

    const isFormValid = active === 1 && enrollmentForm.isValid("applicant") && enrollmentForm.isValid("contact");

    const handleSubmit = (values: EnrollmentPost) => {
        enrollActions.submit(values).then(result => {
            if (result) {
                enrollmentForm.reset();
                navigate("/");
            }
        });
    };

    const backButton = (
        <Button
            size="lg"
            color="primary"
            onClick={() => handleStepChange(active - 1)}
            icon={<IconChevronLeft />}
        >
            Back
        </Button>
    );

    const nextButton = (
        <Button
            size="lg"
            color="primary"
            onClick={() => handleStepChange(active + 1)}
            iconRight={<IconChevronRight />}
            disabled={!isFormValid}
        >
            Next
        </Button>
    );

    const buttonsForActiveGreaterThanZero = (
        active === 1 ? (
            <>
                {backButton}
                {nextButton}
            </>
        ) : (
            <>
                {backButton}
                <Button
                    size="lg"
                    color="primary"
                    iconRight={<IconChevronRight />}
                    onClick={() => handleSubmit(enrollmentForm.values)}
                >
                    Submit
                </Button>
            </>
        )
    );

    return (
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
                            Tutaj dodać informacje o możliwości podjęcia testu poziomującego

                            Najpierw trzeba dodać możliwość tworzenia testów w panelu admina

                            {/* TODO: Add level assessment component with option to answer question, change answers and submit test */}
                            {/* TODO: There needs to be information that all answers are directly persisted in the database */}
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
                {active === 0 ? (
                    <Button
                        size="lg"
                        color="primary"
                        onClick={() => handleStepChange(active + 1)}
                        iconRight={<IconChevronRight />}
                    >
                        Begin
                    </Button>
                ) : (buttonsForActiveGreaterThanZero)}
            </Group>
        </Container>
    );
};