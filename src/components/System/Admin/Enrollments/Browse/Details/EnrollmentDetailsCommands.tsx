import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {ActionIcon, Button, Flex, Popover, Space, Text, Title} from "@mantine/core";
import {IconCheck, IconCircleOff, IconInfoCircle, IconX} from "@tabler/icons-react";
import {useBrowseEnrollmentsContext} from "@components/System/Admin/Enrollments/Browse/_context/BrowseEnrollmentsContext";
import classes from "@components/System/Admin/Enrollments/Browse/_styles/BrowseEnrollmentsDetails.module.scss";

export const EnrollmentDetailsCommands = () => {
    const {actions, selectors: {enrollmentDetails}} = useEnrollmentSlice();
    const context = useBrowseEnrollmentsContext();

    const handleApprove = async () => {
        const result = await actions.approve(enrollmentDetails()?.externalId ?? "");
        if (result) {
            await context.selected?.unset();
        }
    };

    const handleReject = async () => {
        const result = await actions.reject(enrollmentDetails()?.externalId ?? "");
        if (result) {
            await context.selected?.unset();
        }
    };

    const handleUnselect = async () => {
        await context.selected?.unset();
    };

    return (
        <>
            <Title order={2} className={classes.header}>
                Commands
            </Title>

            <Flex
                direction="row"
                align="stretch"
                justify="space-between"
            >
                <Button
                    variant="filled"
                    color="green.6"
                    w="75%"
                    h={50}
                    leftIcon={<IconCheck />}
                    onClick={handleApprove}
                    disabled={enrollmentDetails()?.status !== "Pending"}
                >
                    Approve
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <ActionIcon variant="filled" color="green.6" w="20%" h={50}>
                            <IconInfoCircle />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">
                            Approving this enrollment will add the applicant to the system as a new user.
                            <Space h={10} />
                            You will be able to assign the applicant to a course.
                        </Text>
                    </Popover.Dropdown>
                </Popover>
            </Flex>

            <Flex
                direction="row"
                align="stretch"
                justify="space-between"
            >
                <Button
                    variant="filled"
                    color="orange.6"
                    w="75%"
                    h={50}
                    leftIcon={<IconX />}
                    onClick={handleReject}
                    disabled={enrollmentDetails()?.status !== "Pending"}
                >
                    Reject
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <ActionIcon variant="filled" color="orange.6" w="20%" h={50}>
                            <IconInfoCircle />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">
                            Rejecting this enrollment will set the status to rejected.
                            <Space h={10} />
                            The enrollment will be archived, and the applicant will be able to reapply only by contacting the school.
                        </Text>
                    </Popover.Dropdown>
                </Popover>
            </Flex>

            <Flex
                direction="row"
                align="stretch"
                justify="space-between"
            >
                <Button
                    variant="filled"
                    color="neutral.4"
                    w="75%"
                    h={50}
                    leftIcon={<IconCircleOff />}
                    onClick={handleUnselect}
                >
                    Unselect
                </Button>

                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <ActionIcon variant="filled" color="neutral.4" w="20%" h={50}>
                            <IconInfoCircle />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">
                            Unselecting will remove the enrollment from the details view.
                            <Space h={10} />
                            You can select another enrollment from the list.
                        </Text>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
        </>
    );
};