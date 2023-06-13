import {useEnrollPageContext} from "@app.start/context/enrollPageContext";
import {colors} from "@const/colors";
import {levels, schools} from "@const/education";
import {Center, Col, Flex, Grid, Select, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import type {IEnrollmentPost} from "@models/enrollment/IEnrollmentPost";
import {Button} from "@nextui-org/react";
import {useEnrollmentState} from "@store/slices/enrollment/enrollment/useEnrollmentState";
import {IconCalendar} from "@tabler/icons-react";
import {deepCopy} from "@utils/objectUtils";
import {useEffect, useState} from "react";
import type {Control} from "react-hook-form";
import {Controller, useFormContext, useWatch} from "react-hook-form";

const textInputStyles = {
    input: {
        backgroundColor: colors.indigo100,
        "&:focus": {
            borderColor: colors.indigo500,
            borderWidth: 2,
        }
    }
};

const selectStyles = {
    input: {
        backgroundColor: colors.indigo100,
        "&:focus": {
            borderColor: colors.indigo500,
            borderWidth: 2,
        }
    },
    item: {
        "&[data-selected]": {
            "&, &:hover": {
                backgroundColor: colors.indigo500,
                color: colors.white,
            },
        },
    },
};

interface Props {
    formControl: Control<IEnrollmentPost>;
}

export const StepApplicantDetails = ({formControl}: Props) => {
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [hasValuesChanged, setHasValuesChanged] = useState(false);
    const localContext = useEnrollPageContext();
    const {actions: {persistEnrollmentForm}} = useEnrollmentState();
    const form = useFormContext<IEnrollmentPost>();
    const school = useWatch({
        control: formControl,
        name: "applicant.school",
    });

    useEffect(() => {
        const updatedApplicant = {...form.getValues().applicant, grade: ""};
        form.setValue("applicant", updatedApplicant);
    }, [school]);

    const handleSave = async () => {
        const isValid = await form.trigger();
        await localContext.isEnrollFormValid.set(isValid);

        if (isValid) {
            setIsFormSaved(true);
            const formValues = form.getValues();
            const formValuesCopy = deepCopy<IEnrollmentPost>(formValues);

            persistEnrollmentForm(formValuesCopy);
        }
    };

    useEffect(() => {
        const handleChanges = async () => {
            if (hasValuesChanged) {
                await localContext.isEnrollFormValid.set(false);
                setHasValuesChanged(false);
                setIsFormSaved(false);
            }
        };

        handleChanges().then();
    }, [hasValuesChanged]);

    return (
        <Grid>
            <Col xs={12} md={6} p={20}>
                <Controller
                    name="applicant.firstName"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="First Name"
                            placeholder="Enter your first name"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.firstName?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Controller
                    name="applicant.lastName"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="Last Name"
                            placeholder="Enter your last name"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.lastName?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Controller
                    name="applicant.birthDate"
                    control={formControl}
                    render={({field}) => (
                        <DatePickerInput
                            mt={20}
                            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="Birth Date"
                            placeholder="Pick you birth date"
                            required
                            {...field}
                            value={field.value}
                            onChange={(date) => {
                                field.onChange(date);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.birthDate?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Controller
                    name="applicant.school"
                    control={formControl}
                    render={({field}) => (
                        <Select
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            data={schools}
                            label="School"
                            placeholder="Select your school"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.school?.message}
                            styles={selectStyles}
                        />
                    )}
                />

                <Controller
                    name="applicant.grade"
                    control={formControl}
                    render={({field}) => (
                        <Select
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            data={schools.filter(s => s.value === school).map(s => s.grades)[0]}
                            label="Grade"
                            placeholder="Select your grade"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.grade?.message}
                            styles={selectStyles}
                        />
                    )}
                />

                <Controller
                    name="applicant.levelKey"
                    control={formControl}
                    render={({field}) => (
                        <Select
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            data={levels}
                            label="Level"
                            placeholder="Select your level"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.applicant?.levelKey?.message}
                            styles={selectStyles}
                        />
                    )}
                />
            </Col>

            <Col xs={12} md={6} p={20}>
                <Controller
                    name="contact.email"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="Email"
                            placeholder="Enter your email"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.contact?.email?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Controller
                    name="contact.phoneNumber"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.contact?.phoneNumber?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Flex mt={20} direction="row" justify="space-between">
                    <Controller
                        name="contact.zipCode"
                        control={formControl}
                        render={({field}) => (
                            <TextInput
                                w="35%"
                                size="md"
                                radius="lg"
                                variant="filled"
                                label="Zip Code"
                                placeholder="Enter your zip code"
                                required
                                {...field}
                                onChange={(event) => {
                                    field.onChange(event);
                                    setHasValuesChanged(true);
                                }}
                                error={form.formState.errors.contact?.zipCode?.message}
                                styles={textInputStyles}
                            />
                        )}
                    />

                    <Controller
                        name="contact.zipCodeCity"
                        control={formControl}
                        render={({field}) => (
                            <TextInput
                                w="60%"
                                size="md"
                                radius="lg"
                                variant="filled"
                                label="Zip Code City"
                                placeholder="Enter your zip code city"
                                required
                                {...field}
                                onChange={(event) => {
                                    field.onChange(event);
                                    setHasValuesChanged(true);
                                }}
                                error={form.formState.errors.contact?.zipCodeCity?.message}
                                styles={textInputStyles}
                            />
                        )}
                    />
                </Flex>

                <Controller
                    name="contact.state"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="State"
                            placeholder="Enter your state"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.contact?.state?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Controller
                    name="contact.city"
                    control={formControl}
                    render={({field}) => (
                        <TextInput
                            mt={20}
                            size="md"
                            radius="lg"
                            variant="filled"
                            label="City"
                            placeholder="Enter your city"
                            required
                            {...field}
                            onChange={(event) => {
                                field.onChange(event);
                                setHasValuesChanged(true);
                            }}
                            error={form.formState.errors.contact?.city?.message}
                            styles={textInputStyles}
                        />
                    )}
                />

                <Flex mt={20} direction="row" justify="space-between">
                    <Controller
                        name="contact.street"
                        control={formControl}
                        render={({field}) => (
                            <TextInput
                                w="60%"
                                size="md"
                                radius="lg"
                                variant="filled"
                                label="Street"
                                placeholder="Enter your street"
                                required
                                {...field}
                                onChange={(event) => {
                                    field.onChange(event);
                                    setHasValuesChanged(true);
                                }}
                                error={form.formState.errors.contact?.street?.message}
                                styles={textInputStyles}
                            />
                        )}
                    />

                    <Controller
                        name="contact.houseNumber"
                        control={formControl}
                        render={({field}) => (
                            <TextInput
                                w="35%"
                                size="md"
                                radius="lg"
                                variant="filled"
                                label="House No."
                                placeholder="Enter your house number"
                                required
                                {...field}
                                onChange={(event) => {
                                    field.onChange(event);
                                    setHasValuesChanged(true);
                                }}
                                error={form.formState.errors.contact?.houseNumber?.message}
                                styles={textInputStyles}
                            />
                        )}
                    />
                </Flex>
            </Col>
            <Col xs={12} p={20}>
                <Center>
                    <Button
                        onPress={handleSave}
                        disabled={isFormSaved}
                    >
                        {isFormSaved ? "Saved" : "Save"}
                    </Button>
                </Center>
            </Col>
        </Grid>
    );
};