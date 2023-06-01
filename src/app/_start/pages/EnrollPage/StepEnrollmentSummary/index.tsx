import applicantImage from "@assets/start/applicant_study.svg";
import {Code, Col, Divider, Grid, Image, Mark, Space, Text} from "@mantine/core";
import type {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import type {Control} from "react-hook-form";
import {useWatch} from "react-hook-form";

import classes from "./StepEnrollmentSummary.module.scss";
import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {useTestSlice} from "@store/slices/education/test/testSlice";
import {Spacer} from "@nextui-org/react";

interface Props {
    formControl: Control<EnrollmentPost>;
}

export const StepEnrollmentSummary = ({formControl}: Props) => {
    const {isTestCompleted} = useEnrollPageContext();
    const {selectors: {currentTestResult}} = useTestSlice();
    const applicant = useWatch({
        control: formControl,
        name: "applicant",
    } as const);

    const contact = useWatch({
        control: formControl,
        name: "contact",
    } as const);

    const testResult = currentTestResult() ?? null;

    return (
        <Grid>
            <Col xs={12} md={8} p={20}>
                <Grid>
                    <Col xs={12} md={6} p={20}>
                        <Text weight={500}>First Name: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.firstName}
                        </Text>

                        <Text mt={20} weight={500}>Last Name: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.lastName}
                        </Text>

                        <Text mt={20} weight={500}>Birth Date: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.birthDate.getDate()}
                        </Text>

                        <Text mt={20} weight={500}>School: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.school}
                        </Text>

                        <Text mt={20} weight={500}>Grade: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.grade}
                        </Text>

                        <Text mt={20} weight={500}>Level: </Text>
                        <Text className={classes.formFieldValue}>
                            {applicant.levelKey}
                        </Text>
                    </Col>

                    <Col xs={12} md={6} p={20}>
                        <Text weight={500}>Email: </Text>
                        <Text className={classes.formFieldValue}>
                            {contact.email}
                        </Text>

                        <Text mt={20} weight={500}>Phone Number: </Text>
                        <Text className={classes.formFieldValue}>
                            {contact.phoneNumber}
                        </Text>

                        <Grid>
                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Zip Code: </Text>
                                <Text className={classes.formFieldValue}>
                                    {contact.zipCode}
                                </Text>
                            </Col>

                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Zip Code City: </Text>
                                <Text className={classes.formFieldValue}>
                                    {contact.zipCodeCity}
                                </Text>
                            </Col>
                        </Grid>

                        <Text mt={20} weight={500}>State: </Text>
                        <Text className={classes.formFieldValue}>
                            {contact.state}
                        </Text>

                        <Text mt={20} weight={500}>City: </Text>
                        <Text className={classes.formFieldValue}>
                            {contact.city}
                        </Text>

                        <Grid>
                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Street: </Text>
                                <Text className={classes.formFieldValue}>
                                    {contact.street}
                                </Text>
                            </Col>

                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>House No.: </Text>
                                <Text className={classes.formFieldValue}>
                                    {contact.houseNumber}
                                </Text>
                            </Col>
                        </Grid>
                    </Col>
                </Grid>
            </Col>

            <Col xs={12} md={4} p={20}>
                <Grid mt={20}>
                    <Col xs={12} style={{textAlign: "center"}}>
                        <Text weight={500}>
                            Please check your data.
                        </Text>

                        <Text mt={10} weight={500}>
                            If you want to change something,
                            click on the <Code fz={20}>Back</Code> button,
                            to navigate to step 1.
                        </Text>

                        <Text mt={10} weight={500}>
                            If you are sure, that you want to confirm your enrollment,
                            click on the <Code fz={20}>Submit</Code> button.
                        </Text>
                    </Col>

                    {isTestCompleted.value && (
                        <Col>
                            <Divider
                                mt={20}
                                labelPosition="center"
                                label={
                                    <Text size="xl" weight={700}>
                                        Your calculated level is<Spacer inline x={0.3} />
                                        <Mark
                                            p={5}
                                            color="blue"
                                            style={{borderRadius: "10px"}}
                                        >
                                            {testResult?.calculatedLevel}
                                        </Mark>.
                                    </Text>
                                }
                            />
                        </Col>
                    )}

                    <Col
                        xs={12}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image src={applicantImage} maw={220} />
                    </Col>
                </Grid>
            </Col>
        </Grid>
    );
};