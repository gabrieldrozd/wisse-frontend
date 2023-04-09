import {BrowseEnrollmentsTable} from "@components/System/Admin/Enrollments/Browse/BrowseEnrollmentsTable";
import {Col, Grid} from "@mantine/core";
import {
    BrowseEnrollmentsActionsSection
} from "@components/System/Admin/Enrollments/Browse/BrowseEnrollmentsActionsSection";
import {
    useBrowseEnrollmentsContext
} from "@components/System/Admin/Enrollments/Browse/context/BrowseEnrollmentsContext";
import {useEffect, useState} from "react";

export const BrowseEnrollmentsPage = () => {
    const {enrollment} = useBrowseEnrollmentsContext();

    const [tableSpan, setTableSpan] = useState(10);
    const [actionsSpan, setActionsSpan] = useState(2);

    useEffect(() => {
        console.log(enrollment?.value?.applicant?.firstName ?? "No enrollment selected");

        if (enrollment?.value?.externalId) {
            setTableSpan(8);
            setActionsSpan(4);
        } else {
            setTableSpan(12);
            setActionsSpan(0);
        }
    }, [enrollment?.value?.externalId]);

    return (
        <Grid style={{maxHeight: "100%"}}>
            <Col span={tableSpan}>
                <BrowseEnrollmentsTable />
            </Col>
            <Col span={actionsSpan} hidden={actionsSpan === 0}>
                <BrowseEnrollmentsActionsSection />
            </Col>
        </Grid>
    );
};