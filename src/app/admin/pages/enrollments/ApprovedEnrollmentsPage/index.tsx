import {Badge, Text} from "@mantine/core";
import {createColumnHelper} from "@tanstack/react-table";
import {getFullYears, getShortDate} from "@utils/dateUtils";
import {GenericTable} from "@components/DataDisplay/GenericTable";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/useEnrollmentSlice";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {useCallback} from "react";

const columnsHelper = createColumnHelper<EnrollmentBase>();
const columns = [
    columnsHelper.accessor(x => x.applicant.firstName, {
        header: "First Name",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.applicant.lastName, {
        header: "Last Name",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.applicant.birthDate, {
        header: "Age",
        cell: value => getFullYears(value.getValue()),
    }),
    columnsHelper.accessor(x => x.applicant.birthDate, {
        header: "Birth Date",
        cell: value => getShortDate(value.getValue()),
    }),
    columnsHelper.accessor(x => x.contact.email, {
        header: "Email",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.contact.phoneNumber, {
        header: "Phone",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.status, {
        header: "Status",
        cell: value => {
            switch (value.getValue()) {
                case "Pending":
                    return <Badge color="yellow.5" variant="filled">Pending</Badge>;
                case "Approved":
                    return <Badge color="green.5" variant="filled">Approved</Badge>;
                case "Rejected":
                    return <Badge color="red.5" variant="filled">Rejected</Badge>;
            }
        },
    }),
    columnsHelper.accessor(x => x.enrolledOn, {
        header: "Enrolled On",
        cell: value => getShortDate(value.getValue()),
    }),
    columnsHelper.accessor(x => x.decisionDate, {
        header: "Decision Date",
        cell: value => {
            if (value.getValue().toString() !== "0001-01-01T00:00:00") {
                return getShortDate(value.getValue());
            }
            return <Text>-</Text>;
        },
    })
];

export const ApprovedEnrollmentsPage = () => {
    const context = useEnrollmentsContext();
    const {actions, selectors} = useEnrollmentSlice();

    const approvedEnrollments = selectors.approvedEnrollmentsList();

    const browseApprovedEnrollments = useCallback(async (pageIndex: number, pageSize: number, isAscending: boolean) => {
        await actions.browseApprovedEnrollments(pageIndex, pageSize, isAscending);
    }, [actions]);

    return (
        <GenericTable
            columns={columns}
            dataName="Approved Enrollments"
            data={approvedEnrollments}
            fetchData={browseApprovedEnrollments}
            selectedRow={context.selected?.value}
            selectRow={context.selected?.set}
            unselectRow={context.selected?.unset}
        />
    );
};