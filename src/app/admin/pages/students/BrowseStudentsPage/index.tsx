import React, {useEffect, useState} from "react";
import {Col, Grid} from "@mantine/core";
import {useStudentsContext} from "@app.admin/context/studentsContext";
import {BrowseStudentsTable} from "@app.admin/pages/students/BrowseStudentsPage/components/BrowseStudentsTable";
import {BrowseStudentsDetails} from "@app.admin/pages/students/BrowseStudentsPage/components/BrowseStudentsDetails";
import {PaginationContextProvider} from "@context/PaginationContextProvider";

export const BrowseStudentsPage = () => {
    const context = useStudentsContext();

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
                    <BrowseStudentsTable />
                </Col>
                <Col span={actionsSpan} hidden={actionsSpan === 0}>
                    <BrowseStudentsDetails />
                </Col>
            </PaginationContextProvider>
        </Grid>
    );
};