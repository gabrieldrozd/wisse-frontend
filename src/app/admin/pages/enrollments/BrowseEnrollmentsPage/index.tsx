import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {PaginationContextProvider} from "@context/PaginationContextProvider";
import {Col, Grid} from "@mantine/core";
import {useEffect, useState} from "react";

import {BrowseEnrollmentsDetails} from "./components/BrowseEnrollmentsDetails";
import {BrowseEnrollmentsTable} from "./components/BrowseEnrollmentsTable";

export const BrowseEnrollmentsPage = () => {
    const context = useEnrollmentsContext();

    const [tableSpan, setTableSpan] = useState(10);
    const [actionsSpan, setActionsSpan] = useState(2);

    useEffect(() => {
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
            <PaginationContextProvider>
                <Col span={tableSpan}>
                    <BrowseEnrollmentsTable />
                </Col>
                <Col span={actionsSpan} hidden={actionsSpan === 0}>
                    <BrowseEnrollmentsDetails />
                </Col>
            </PaginationContextProvider>
        </Grid>
    );
};