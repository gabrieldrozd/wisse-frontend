import {useTeachersContext} from "@app.admin/context/teachersContext";
import {BrowseTeachersDetails} from "@app.admin/pages/teachers/BrowseTeachersPage/components/BrowseTeachersDetails";
import {BrowseTeachersTable} from "@app.admin/pages/teachers/BrowseTeachersPage/components/BrowseTeachersTable";
import {PaginationContextProvider} from "@context/PaginationContextProvider";
import {Col, Grid} from "@mantine/core";
import React, {useEffect, useState} from "react";

export const BrowseTeachersPage = () => {
    const context = useTeachersContext();

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
                    <BrowseTeachersTable />
                </Col>
                <Col span={actionsSpan} hidden={actionsSpan === 0}>
                    <BrowseTeachersDetails />
                </Col>
            </PaginationContextProvider>
        </Grid>
    );
};