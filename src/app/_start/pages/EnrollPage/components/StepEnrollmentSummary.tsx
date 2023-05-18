import {Col, Grid, Image, Text} from "@mantine/core";
import applicantImage from "@assets/start/applicant_study.svg";
import {useEnrollmentFormContext} from "@app.start/context/enrollFormContext";
import classes from "./styles/StepEnrollmentSummary.module.scss";

export const StepEnrollmentSummary = () => {
    const form = useEnrollmentFormContext();

    return (
        <Grid>
            <Col xs={12} md={8} p={20}>
                <Grid>
                    <Col xs={12} md={6} p={20}>
                        <Text weight={500}>First Name: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.firstName}
                        </Text>

                        <Text mt={20} weight={500}>Last Name: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.lastName}
                        </Text>

                        <Text mt={20} weight={500}>Birth Date: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.birthDate.getDate()}
                        </Text>

                        <Text mt={20} weight={500}>School: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.school}
                        </Text>

                        <Text mt={20} weight={500}>Grade: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.grade}
                        </Text>

                        <Text mt={20} weight={500}>Level: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.applicant.levelKey}
                        </Text>
                    </Col>

                    <Col xs={12} md={6} p={20}>
                        <Text weight={500}>Email: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.contact.email}
                        </Text>

                        <Text mt={20} weight={500}>Phone Number: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.contact.phoneNumber}
                        </Text>

                        <Grid>
                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Zip Code: </Text>
                                <Text className={classes.formFieldValue}>
                                    {form.values.contact.zipCode}
                                </Text>
                            </Col>

                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Zip Code City: </Text>
                                <Text className={classes.formFieldValue}>
                                    {form.values.contact.zipCodeCity}
                                </Text>
                            </Col>
                        </Grid>

                        <Text mt={20} weight={500}>State: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.contact.state}
                        </Text>

                        <Text mt={20} weight={500}>City: </Text>
                        <Text className={classes.formFieldValue}>
                            {form.values.contact.city}
                        </Text>

                        <Grid>
                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>Street: </Text>
                                <Text className={classes.formFieldValue}>
                                    {form.values.contact.street}
                                </Text>
                            </Col>

                            <Col xs={12} md={6}>
                                <Text mt={20} weight={500}>House No.: </Text>
                                <Text className={classes.formFieldValue}>
                                    {form.values.contact.houseNumber}
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
                            If you want to change something, please click on the back button.
                        </Text>

                        <Text mt={10} weight={500}>
                            If you want to confirm your enrollment, please click on the next button.
                        </Text>
                    </Col>

                    <Col xs={12} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image src={applicantImage} maw={310} />
                    </Col>
                </Grid>
            </Col>
        </Grid>
    );
};