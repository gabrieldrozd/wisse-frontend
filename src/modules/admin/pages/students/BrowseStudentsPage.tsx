import React, {useEffect, useState} from "react";
import {Col, Grid} from "@mantine/core";
import {useStudentsContext} from "@modules.admin/components/students/_context/StudentsContext";
import {BrowseStudentsTable} from "@modules.admin/components/students/browse/BrowseStudentsTable";
import {BrowseStudentsDetails} from "@modules.admin/components/students/browse/BrowseStudentsDetails";

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
            <Col span={tableSpan}>
                <BrowseStudentsTable />
            </Col>
            <Col span={actionsSpan} hidden={actionsSpan === 0}>
                <BrowseStudentsDetails />
            </Col>
        </Grid>
    );
};