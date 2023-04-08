import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {useEffect, useState} from "react";
import {Button, Flex, Group, Mark, Pagination, ScrollArea, Select, Space, Table, Text, Title} from "@mantine/core";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import classes from "./styles/BrowseEnrollmentsTable.module.scss";
import {getFullYears, getShortDate} from "@core/utilities/dateUtils";
import {GenericTable} from "@components/common/DataDisplay/GenericTable";

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
                    return <Mark p={10} color="yellow" fw={500} style={{color: "black",borderRadius: "5px"}}>Pending</Mark>;
                case "Approved":
                    return <Mark p={10} color="green" fw={500} style={{color: "black",borderRadius: "5px"}}>Approved</Mark>;
                case "Rejected":
                    return <Mark p={10} color="red" fw={500} style={{color: "black",borderRadius: "5px"}}>Rejected</Mark>;
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
    const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentBase>();

    const fetchEnrollments = async (pageIndex: number, pageSize: number, isAscending: boolean) => {
        const pagination: PaginationRequest = {
            pageSize: pageSize,
            pageIndex: pageIndex,
            isAscending: true,
        };
        const enrollmentsData = await browseEnrollments(pagination);
        setEnrollmentsList(enrollmentsData);
    };

    const selectEnrollment = async (enrollmentRow: EnrollmentBase) => {
        setSelectedEnrollment(enrollmentRow);
    };

    return (
        <GenericTable
            columns={columns}
            data={enrollmentsList}
            selectedRow={selectedEnrollment}
            fetchData={fetchEnrollments}
            selectRow={selectEnrollment}
        />
    );
};