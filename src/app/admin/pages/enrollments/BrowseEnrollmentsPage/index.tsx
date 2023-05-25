import {useEffect, useState} from "react";
import {Col, Grid} from "@mantine/core";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {BrowseEnrollmentsTable} from "./components/BrowseEnrollmentsTable";
import {BrowseEnrollmentsDetails} from "./components/BrowseEnrollmentsDetails";

export const BrowseEnrollmentsPage = () => {
    const context = useEnrollmentsContext();

    const [tableSpan, setTableSpan] = useState(10);
    const [actionsSpan, setActionsSpan] = useState(2);

    useEffect(() => {
        console.log(context.selected?.value?.applicant?.firstName ?? "No enrollment selected");

        if (context.selected?.value?.externalId) {
            setTableSpan(7);
            setActionsSpan(5);
        } else {
            setTableSpan(12);
            setActionsSpan(0);
        }
    }, [context.selected?.value?.externalId]);

    return (
        <Grid>
            <Col span={tableSpan}>
                <BrowseEnrollmentsTable />
            </Col>
            <Col span={actionsSpan} hidden={actionsSpan === 0}>
                <BrowseEnrollmentsDetails />
            </Col>
        </Grid>
    );
};