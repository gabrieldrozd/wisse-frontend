import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Flex, Grid, Group, Table, Title} from "@mantine/core";
import {ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import classes from "./styles/BrowseEnrollmentsTable.module.scss";

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
    columnsHelper.accessor(x => x.contact.email, {
        header: "Email",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.contact.phoneNumber, {
        header: "Phone",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.enrollmentStatus, {
        header: "Status",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.enrollmentDate, {
        header: "Enrolled on",
        cell: value => value.getValue(),
    }),
    columnsHelper.display({
        id: "actions",
        header: "Actions",
        cell: props => {
            return (
                <div className={classes.actionButtons}>
                    <Button
                        onClick={() => {
                            console.log(props.row.original);
                        }}
                    >
                        View
                    </Button>
                    <Button>View</Button>
                    <Button>View</Button>
                </div>
            );
        },
    })
];

export const BrowseEnrollmentsTable = () => {
    const {actions: {browseEnrollments}} = useEnrollmentSlice();
    const [enrollmentsList, setEnrollmentsList] = useState<PaginatedList<EnrollmentBase>>(PaginatedList.default);
    const [pageSize, setPageSize] = useState(10);

    const table = useReactTable({
        data: enrollmentsList.list,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const fetchEnrollments = async () => {
        const pagination: PaginationRequest = {
            pageSize: pageSize,
            pageIndex: 1,
            isAscending: true,
        };
        const enrollmentsData = await browseEnrollments(pagination);
        setEnrollmentsList(enrollmentsData);
    };

    useEffect(() => {
        fetchEnrollments().then();
    }, [pageSize]);

    return (
        <Flex
            className={classes.tableContainer}
            direction="column"
            align="stretch"
        >
            <Title order={1}>Browse Enrollments</Title>
            <Table
                className={classes.table}
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                verticalSpacing="sm"
            >
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                }
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Flex>
    );
};