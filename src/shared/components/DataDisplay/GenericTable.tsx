import {Flex, Group, Mark, Pagination, ScrollArea, Select, Space, Table, Text, Title} from "@mantine/core";
import type {IPaginatedList} from "@models/api/pagination";
import {IconSortAscending, IconSortDescending} from "@tabler/icons-react";
import type {ColumnDef, SortingState} from "@tanstack/react-table";
import {flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table";
import {createRef, useCallback, useEffect, useState} from "react";

import classes from "./styles/GenericTable.module.scss";

import {useArrowKeySelect} from "@/shared/components/DataDisplay/useArrowKeySelect";
import {DataNotFound} from "@/shared/components/DataNotFound/DataNotFound";

export interface Props {
    /**
     * Tanstack React Table columns definition
     */
    columns: ColumnDef<any, any>[];
    /**
     * Table key for better identification
     */
    dataName?: string;
    /**
     * PaginatedList object as a data holder for the table
     */
    data: IPaginatedList<any>;
    /**
     * Function for fetching data
     * @param pageIndex - page index | default: 1
     * @param pageSize - page size | default: 10
     * @param isAscending - is ascending | default: true
     */
    fetchData: (pageIndex: number, pageSize: number, isAscending: boolean) => Promise<any>;
    /**
     * Any object as a selected row
     */
    selectedRow: any;
    /**
     * async function for selecting a row. Should be awaited in order to work properly
     * @param row - row data
     */
    selectRow: (objectRow: any) => Promise<void>;
    /**
     * async function for unselecting a row. Should be awaited in order to work properly
     */
    unselectRow: () => Promise<void>;
}

export const GenericTable = ({columns, dataName, data, selectedRow, fetchData, selectRow, unselectRow}: Props) => {
    const tableBodyRef = createRef<HTMLTableSectionElement>();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAscending, setIsAscending] = useState(true);
    const totalPages = Math.ceil(data.pagination.totalItems / data.pagination.pageSize);

    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data: data.list,
        columns: columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    const fetch = useCallback(async () => {
        await fetchData(pageIndex, pageSize, isAscending);
    }, [pageIndex, pageSize, isAscending]);

    useEffect(() => {
        fetch().then();
    }, []);

    useArrowKeySelect({tableBodyRef, table, selectedRow, selectRow});

    const handlePageSizeChange = async (size: string | null) => {
        if (size) {
            const newPageSize = parseInt(size);
            setPageSize(newPageSize);
            await fetchData(pageIndex, newPageSize, isAscending);
        }
    };

    const handlePageChange = async (page: number) => {
        setPageIndex(page);
        await fetchData(page, pageSize, isAscending);
    };

    const handleNextPage = async () => {
        if (data.pagination.hasNextPage) {
            const newPageIndex = pageIndex + 1;
            setPageIndex(newPageIndex);
            await fetchData(newPageIndex, pageSize, isAscending);
        }
    };

    const handlePreviousPage = async () => {
        if (data.pagination.hasPreviousPage) {
            const newPageIndex = pageIndex - 1;
            setPageIndex(newPageIndex);
            await fetchData(newPageIndex, pageSize, isAscending);
        }
    };

    if (data.list.length === 0) {
        return <DataNotFound dataName={dataName!} />;
    }

    return (
        <Flex
            className={classes.tableContainer}
            direction="column"
            align="stretch"
            justify="space-between"
        >
            <ScrollArea mah="75vh" type="hover">
                <Table className={classes.table}>
                    <thead className={classes.tableHead}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className={classes.tableHeadRow}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className={classes.tableHeadCell}>
                                    {header.isPlaceholder ? null : (
                                        <Flex
                                            align="center"
                                            justify="center"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <Space w={5} />
                                            {{
                                                asc: <IconSortAscending size={20} />,
                                                desc: <IconSortDescending size={20} />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </Flex>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody ref={tableBodyRef} tabIndex={0} className={classes.tableBody}>
                    {table.getRowModel().rows.map(row => {
                        const isSelected = selectedRow?.externalId === row.original.externalId;
                        return (
                            <tr
                                key={row.id}
                                className={`${classes.tableBodyRow} ${isSelected ? classes.selectedTableBodyRow : ""}`}
                                onClick={async () => {
                                    if (isSelected) {
                                        await unselectRow();
                                        return;
                                    }
                                    await selectRow(row.original);
                                }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className={classes.tableBodyCell}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </ScrollArea>

            <Group
                mt={20}
                p={15}
                bg="indigo.2"
                position="apart"
                align="center"
                style={{
                    borderRadius: "0.5rem",
                }}
            >
                {data.pagination.totalItems > 0 ? (
                    <Title order={6}>
                        Showing {" "}
                        <Mark color="white" p={3} style={{borderRadius: "5px"}}>
                            {data.pagination.count}
                        </Mark>
                        {" "}out of{" "}
                        <Mark color="white" p={3} style={{borderRadius: "5px"}}>
                            {data.pagination.totalItems}
                        </Mark>
                        {" "}entries
                    </Title>

                ) : (
                    <Title order={6}>No entries found</Title>
                )}

                <Group>
                    <Flex align="center">
                        <Text fw={500}>Page size</Text>
                        <Space w={5} />
                        <Select
                            w={80}
                            size="md"
                            variant="default"
                            value={pageSize.toString()}
                            data={[
                                {value: "10", label: "10"},
                                {value: "25", label: "25"},
                            ]}
                            onChange={value => handlePageSizeChange(value)}
                            styles={(theme) => ({
                                item: {
                                    "&[data-selected]": {
                                        "&, &:hover": {
                                            backgroundColor: theme.colors.indigo[5],
                                            color: theme.colors.white[0],
                                            fontWeight: 500,
                                        },
                                    },
                                    "&[data-hovered]": {},
                                },
                                input: {
                                    "&:focus": {
                                        boxShadow: `0 0 0 1px ${theme.colors.indigo[5]}`,
                                        borderColor: theme.colors.indigo[5],
                                    },
                                },
                            })}
                        />
                    </Flex>
                    <Space w={10} />
                    <Pagination
                        size="md"
                        color="indigo.5"
                        total={totalPages}
                        onNextPage={handleNextPage}
                        onPreviousPage={handlePreviousPage}
                        onChange={handlePageChange}
                    />
                </Group>
            </Group>
        </Flex>
    );
};
