import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {Badge, Text} from "@mantine/core";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {useEnrollmentSlice} from "@store/slices/enrollment/enrollment/useEnrollmentSlice";
import type {ColumnDef} from "@tanstack/react-table";
import {createColumnHelper} from "@tanstack/react-table";
import {getFullYears, getShortDate} from "@utils/dateUtils";
import {useCallback, useEffect} from "react";

import {GenericTable} from "@/shared/components/DataDisplay/GenericTable";
import {GenericTableV2} from "@components/DataDisplay/GenericTableV2";
import {usePagination} from "@context/PaginationContextProvider";
import {useQuery} from "@tanstack/react-query";
import {requestAgent} from "@api/requestAgent";
import {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import {useAppContext} from "@context/ApplicationContext";
import {useEnrollmentApi} from "@api/hooks/useEnrollmentApi";

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
];

export const BrowseEnrollmentsTable = () => {
    const appContext = useAppContext();
    const pagination = usePagination();
    const exrollmentsContext = useEnrollmentsContext();
    const enrollmentApi = useEnrollmentApi();

    const {isLoading, data, refetch} = enrollmentApi.queries
        .browseEnrollments(pagination.model);

    useEffect(() => {
        appContext.isLoading.set(isLoading);
    }, [isLoading]);

    return (
        <>
            {!isLoading &&
                <GenericTableV2
                    columns={columns}
                    dataName="Enrollments"
                    data={data?.data as IPaginatedList<EnrollmentBase>}
                    pagination={pagination}
                    refetch={refetch as any}
                    selectedRow={exrollmentsContext.selected?.value}
                    selectRow={exrollmentsContext.selected?.set}
                    unselectRow={exrollmentsContext.selected?.unset}
                />
            }
        </>
    );
};