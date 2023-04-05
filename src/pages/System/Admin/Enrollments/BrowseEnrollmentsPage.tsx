import {BrowseEnrollmentsTable} from "@components/System/Admin/Enrollments/Browse/BrowseEnrollmentsTable";
import {Col, Grid} from "@mantine/core";

export const BrowseEnrollmentsPage = () => {
    return (
        <Grid>
            <Col span={8}>
                <BrowseEnrollmentsTable />
            </Col>
            <Col span={4}>
                <BrowseEnrollmentsTable />
            </Col>
        </Grid>
    );
};