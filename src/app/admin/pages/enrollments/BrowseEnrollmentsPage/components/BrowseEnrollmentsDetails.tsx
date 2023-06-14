import {useEnrollmentApi} from "@api/hooks/useEnrollmentApi";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {Flex, Loader, Skeleton} from "@mantine/core";
import {isDefined} from "@utils/objectUtils";
import {useEffect} from "react";

import classes from "./_styles/BrowseEnrollmentsDetails.module.scss";
import {EnrollmentDetailsCommands} from "./Details/EnrollmentDetailsCommands";
import {EnrollmentDetailsPresentation} from "./Details/EnrollmentDetailsPresentation";
import {LocalLoader} from "@components/Loaders/LocalLoader";

export const BrowseEnrollmentsDetails = () => {
    const context = useEnrollmentsContext();
    const selectedId = context.selected.value.externalId;

    const enrollmentApi = useEnrollmentApi();
    const {isLoading, data, refetch} = enrollmentApi.queries.enrollmentDetails(selectedId);

    useEffect(() => {
        selectedId ? refetch() : null;
    }, [selectedId]);

    if (isLoading) {
        return <LocalLoader text="Details are being loaded..." textSize={20} />;
    }

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
                {isDefined(data) && <EnrollmentDetailsPresentation enrollment={data} />}
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
                {data?.externalId && (
                    <EnrollmentDetailsCommands />
                )}
            </Flex>
        </Flex>
    );
};