import React, {useEffect, useState} from "react";
import {Col, Grid} from "@mantine/core";
import {useTeachersContext} from "@modules.admin/components/teachers/_context/TeachersContext";
import {BrowseTeachersTable} from "@modules.admin/components/teachers/browse/BrowseTeachersTable";
import {BrowseTeachersDetails} from "@modules.admin/components/teachers/browse/BrowseTeachersDetails";

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
            <Col span={tableSpan}>
                <BrowseTeachersTable />
            </Col>
            <Col span={actionsSpan} hidden={actionsSpan === 0}>
                <BrowseTeachersDetails />
            </Col>
        </Grid>
    );
};