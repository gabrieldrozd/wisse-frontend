import {useState} from "react";
import {Badge, Mark, Text} from "@mantine/core";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {getFullYears, getShortDate} from "@core/utilities/dateUtils";
import {GenericTable} from "@components/common/DataDisplay/GenericTable";
import {
    useBrowseEnrollmentsContext
} from "@components/System/Admin/Enrollments/Browse/context/BrowseEnrollmentsContext";

const columnsHelper = createColumnHelper<EnrollmentBase>();
const columns: ColumnDef<EnrollmentBase, any>[] = [
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
    }),
    // columnsHelper.display({
    //     id: "actions",
    //     header: "Actions",
    //     cell: props => {
    //         return (
    //             <div className={classes.actionButtons}>
    //                 <Button
    //                     onClick={() => {
    //                         console.log(props.row.original);
    //                     }}
    //                 >
    //                     View
    //                 </Button>
    //                 <Button>View</Button>
    //                 <Button>View</Button>
    //             </div>
    //         );
    //     },
    // })
];

export const BrowseEnrollmentsTable = () => {
    const {actions: {browseEnrollments}} = useEnrollmentSlice();
    const [enrollmentsList, setEnrollmentsList] = useState<PaginatedList<EnrollmentBase>>(PaginatedList.default);
    const {enrollment} = useBrowseEnrollmentsContext();

    const fetchEnrollments = async (pageIndex: number, pageSize: number, isAscending: boolean) => {
        const pagination: PaginationRequest = {
            pageSize: pageSize,
            pageIndex: pageIndex,
            isAscending: true,
        };
        const enrollmentsData = await browseEnrollments(pagination);
        setEnrollmentsList(enrollmentsData);
    };

    return (
        <GenericTable
            columns={columns}
            data={enrollmentsList}
            selectedRow={enrollment.value}
            fetchData={fetchEnrollments}
            selectRow={enrollment.set}
            unselectRow={enrollment.unset}
        />
    );
};