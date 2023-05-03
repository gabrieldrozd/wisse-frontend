import {Col, Flex, Grid, Select, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {IconCalendar} from "@tabler/icons-react";
import {useEnrollmentFormContext} from "@modules.start/components/enroll/enrollFormContext";
import {levels, schools} from "@core/constants/education";

export const StepApplicantDetails = () => {
    const form = useEnrollmentFormContext();

    return (
        <Grid>
            <Col xs={12} md={6} p={20}>
                <TextInput
                    size="md"
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    {...form.getInputProps("applicant.firstName")}
                />

                <TextInput
                    mt={20}
                    size="md"
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    {...form.getInputProps("applicant.lastName")}
                />

                <DatePickerInput
                    mt={20}
                    icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                    size="md"
                    label="Birth Date"
                    placeholder="Pick you birth date"
                    required
                    {...form.getInputProps("applicant.birthDate")}
                />

                <Select
                    mt={20}
                    size="md"
                    data={schools}
                    label="School"
                    placeholder="Select your school"
                    required
                    {...form.getInputProps("applicant.school")}
                />

                <Select
                    mt={20}
                    size="md"
                    data={schools.filter(school => school.value === form.values.applicant.school)[0].grades}
                    label="Grade"
                    placeholder="Select your grade"
                    required
                    {...form.getInputProps("applicant.grade")}
                />

                <Select
                    mt={20}
                    size="md"
                    data={levels}
                    label="Level"
                    placeholder="Select your level"
                    required
                    {...form.getInputProps("applicant.levelKey")}
                />
            </Col>

            <Col xs={12} md={6} p={20}>
                <TextInput
                    size="md"
                    label="Email"
                    placeholder=""
                    required
                    {...form.getInputProps("contact.email")}
                />

                <TextInput
                    mt={20}
                    size="md"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    required
                    {...form.getInputProps("contact.phoneNumber")}
                />


                <Flex mt={20} direction="row" justify="space-between">
                    <TextInput
                        w="35%"
                        size="md"
                        label="Zip Code"
                        placeholder="Enter your zip code"
                        required
                        {...form.getInputProps("contact.zipCode")}
                    />

                    <TextInput
                        w="60%"
                        size="md"
                        label="Zip Code City"
                        placeholder="Enter your zip code city"
                        required
                        {...form.getInputProps("contact.zipCodeCity")}
                    />
                </Flex>

                <TextInput
                    mt={20}
                    size="md"
                    label="State"
                    placeholder="Enter your state"
                    required
                    {...form.getInputProps("contact.state")}
                />

                <TextInput
                    mt={20}
                    size="md"
                    label="City"
                    placeholder="Enter your city"
                    required
                    {...form.getInputProps("contact.city")}
                />

                <Flex mt={20} direction="row" justify="space-between">
                    <TextInput
                        w="60%"
                        size="md"
                        label="Street"
                        placeholder="Enter your street"
                        {...form.getInputProps("contact.street")}
                    />

                    <TextInput
                        w="35%"
                        size="md"
                        label="House No."
                        placeholder="Enter your house number"
                        required
                        {...form.getInputProps("contact.houseNumber")}
                    />
                </Flex>
            </Col>
        </Grid>
    );
};