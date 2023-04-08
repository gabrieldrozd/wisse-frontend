import {BrowseEnrollmentsTable} from "@components/System/Admin/Enrollments/Browse/BrowseEnrollmentsTable";
import {Col, Grid} from "@mantine/core";
import {
    BrowseEnrollmentsActionsSection
} from "@components/System/Admin/Enrollments/Browse/BrowseEnrollmentsActionsSection";

export const BrowseEnrollmentsPage = () => {
    // TODO: some local context in order to handle the state of the page -> selected enrollments, etc.
    // TODO: some local context in order to handle the state of the page -> selected enrollments, etc.
    // TODO: some local context in order to handle the state of the page -> selected enrollments, etc.
    // TODO: some local context in order to handle the state of the page -> selected enrollments, etc.
    // TODO: some local context in order to handle the state of the page -> selected enrollments, etc.
    // ????????????????????????????????????????????????????????????????????????????????????????????????

    return (
        <Grid style={{maxHeight: "100%"}}>
            <Col span={10}>
                <BrowseEnrollmentsTable />
            </Col>
            <Col span={2}>
                <BrowseEnrollmentsActionsSection />
            </Col>
        </Grid>
    );
};