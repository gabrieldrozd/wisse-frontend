import {Badge, Text} from "@mantine/core";
import {createColumnHelper} from "@tanstack/react-table";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {getFullYears, getShortDate} from "@utils/dateUtils";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {GenericTable} from "@/shared/components/DataDisplay/GenericTable";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";

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

export const RejectedEnrollmentsPage = () => {
    const context = useEnrollmentsContext();
    const {actions, selectors} = useEnrollmentSlice();

    return (
        <GenericTable
            columns={columns}
            dataName="Rejected Enrollments"
            data={selectors.rejectedEnrollmentsList()}
            fetchData={actions.browseRejectedEnrollments}
            selectedRow={context.selected?.value}
            selectRow={context.selected?.set}
            unselectRow={context.selected?.unset}
        />
    );
};