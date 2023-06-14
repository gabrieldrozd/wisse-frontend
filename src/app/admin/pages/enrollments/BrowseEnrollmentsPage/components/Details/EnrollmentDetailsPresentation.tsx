import {Box, Group, Text, Title} from "@mantine/core";
import type {IEnrollmentDetails} from "@models/enrollment/IEnrollmentDetails";
import {IconAt, IconHome, IconLanguage, IconMapPin, IconMilitaryRank, IconPhone, IconSchool, IconZip} from "@tabler/icons-react";

import classes from "../_styles/BrowseEnrollmentsDetails.module.scss";

interface Props {
    enrollment: IEnrollmentDetails;
}

export const EnrollmentDetailsPresentation = ({enrollment}: Props) => {
    const {applicant, contact} = enrollment;

    return (
        <>
            <Title order={2} className={classes.header}>
                {applicant.firstName} {applicant.lastName}
            </Title>

            <Box p={20} my={10}>
                <Title order={3}>Contact details</Title>
                <Group mt={10}>
                    <IconAt size={30} />
                    Email:
                    <Text fw={600}>{contact.email}</Text>
                </Group>

                <Group mt={10}>
                    <IconPhone size={30} />
                    Phone:
                    <Text fw={600}>{contact.phoneNumber}</Text>
                </Group>
            </Box>

            <Box p={20} my={10}>
                <Title order={3}>Address details</Title>
                <Group mt={10}>
                    <IconMapPin size={30} />
                    State:
                    <Text fw={600}>{contact.state}</Text>
                </Group>

                <Group mt={10}>
                    <IconZip size={30} />
                    Zip code:
                    <Text fw={600}>{contact.zipCode}</Text> {contact.zipCodeCity}
                </Group>

                <Group mt={10}>
                    <IconHome size={30} />
                    Address:
                    <Text fw={600}>{contact.city}</Text> {contact.street} {contact.houseNumber}
                </Group>
            </Box>

            <Box p={20} my={10}>
                <Title order={3}>Education details</Title>
                <Group mt={10}>
                    <IconLanguage size={30} />
                    Language:
                    <Text fw={600}>{applicant.languageLevel.key}</Text> {applicant.languageLevel.name}
                </Group>

                <Group mt={10}>
                    <IconSchool size={30} />
                    School:
                    <Text fw={600}>{applicant.education.school}</Text>
                </Group>

                <Group mt={10}>
                    <IconMilitaryRank size={30} />
                    Grade:
                    <Text fw={600}>{applicant.education.grade}</Text>
                </Group>
            </Box>

        </>
    );
};