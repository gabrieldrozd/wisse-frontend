import {useEnrollmentApi} from "@api/hooks/useEnrollmentApi";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {ActionIcon, Button, Flex, Popover, Space, Text, Title} from "@mantine/core";
import {IconCheck, IconCircleOff, IconInfoCircle, IconX} from "@tabler/icons-react";
import {isDefined} from "@utils/objectUtils";
import {useEffect} from "react";

import classes from "../_styles/BrowseEnrollmentsDetails.module.scss";

export const EnrollmentDetailsCommands = () => {
    const context = useEnrollmentsContext();
    const selectedId = context.selected.value.externalId;

    const enrollmentApi = useEnrollmentApi();
    const {data, refetch} = enrollmentApi.queries.enrollmentDetails(selectedId);
    const {mutate: approveEnrollment, isSuccess: isApproved,} = enrollmentApi.commands.approve;
    const {mutate: rejectEnrollment, isSuccess: isRejected} = enrollmentApi.commands.reject;

    useEffect(() => {
        selectedId ? refetch() : null;
    }, [selectedId]);

    useEffect(() => {
        if (isApproved || isRejected) {
            context.selected?.unset();
        }
    }, [isApproved, isRejected]);

    const handleApprove = () => approveEnrollment(selectedId ?? "");
    const handleReject = () => rejectEnrollment(selectedId ?? "");
    const handleUnselect = () => context.selected?.unset();

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
                    disabled={isDefined(data) && data.status !== "Pending"}
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
                    disabled={isDefined(data) && data.status !== "Pending"}
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