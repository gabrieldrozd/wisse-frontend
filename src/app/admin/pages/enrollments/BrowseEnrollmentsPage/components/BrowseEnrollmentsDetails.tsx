import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {Flex} from "@mantine/core";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/useEnrollmentSlice";
import {useEffect} from "react";

import classes from "./_styles/BrowseEnrollmentsDetails.module.scss";
import {EnrollmentDetailsCommands} from "./Details/EnrollmentDetailsCommands";
import {EnrollmentDetailsPresentation} from "./Details/EnrollmentDetailsPresentation";

export const BrowseEnrollmentsDetails = () => {
    const {actions, selectors} = useEnrollmentSlice();
    const context = useEnrollmentsContext();
    const enrollmentDetails = selectors.enrollmentDetails();

    const fetchEnrollment = async () => {
        if (!context.selected?.value?.externalId) return;

        const selectedId = context.selected.value.externalId;
        if (enrollmentDetails?.externalId === selectedId) return;

        await actions.enrollmentDetails(context.selected?.value?.externalId ?? "");
    };

    useEffect(() => {
        fetchEnrollment().then();
    }, [context.selected?.value?.externalId]);

    return (
        <Flex
            className={classes.rootContainer}
            direction="row"
            align="flex-start"
            justify="space-between"
        >

            <Flex
                className={classes.detailsContainer}
                direction="column"
                bg="gray"
                style={{
                    height: "100%",
                    width: "100%",
                    flexGrow: 1,
                }}
            >
                {enrollmentDetails?.externalId && (
                    <EnrollmentDetailsPresentation enrollment={enrollmentDetails} />
                )}
            </Flex>

            <Flex
                ml={20}
                direction="column"
                align="stretch"
                justify="flex-start"
                gap={15}
                bg="indigo.1"
                style={{
                    height: "100%",
                    borderRadius: 10,
                }}
            >
                {enrollmentDetails?.externalId && (
                    <EnrollmentDetailsCommands />
                )}
            </Flex>
        </Flex>
    );
};