import {useEffect} from "react";
import {Flex} from "@mantine/core";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {EnrollmentDetailsPresentation} from "./Details/EnrollmentDetailsPresentation";
import {EnrollmentDetailsCommands} from "./Details/EnrollmentDetailsCommands";
import classes from "./_styles/BrowseEnrollmentsDetails.module.scss";

export const BrowseEnrollmentsDetails = () => {
    const {actions, selectors: {enrollmentDetails}} = useEnrollmentSlice();
    const context = useEnrollmentsContext();

    const fetchEnrollment = async () => {
        if (!context.selected?.value?.externalId) return;
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
                {enrollmentDetails()?.externalId && (
                    <EnrollmentDetailsPresentation enrollment={enrollmentDetails()} />
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
                {enrollmentDetails()?.externalId && (
                    <EnrollmentDetailsCommands />
                )}
            </Flex>
        </Flex>
    );
};