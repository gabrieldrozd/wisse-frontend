import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {GenericTable} from "@components/DataDisplay/GenericTable";
import {Badge, Text} from "@mantine/core";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {useEnrollmentState} from "@store/slices/enrollment/enrollment/useEnrollmentState";
import {createColumnHelper} from "@tanstack/react-table";
import {getFullYears, getShortDate} from "@utils/dateUtils";
import {useAppContext} from "@context/ApplicationContext";
import {usePagination} from "@context/PaginationContextProvider";
import {useEnrollmentApi} from "@api/hooks/useEnrollmentApi";
import {useEffect} from "react";
import {GenericTableV2} from "@components/DataDisplay/GenericTableV2";
import {isDefined} from "@utils/objectUtils";

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
    const appContext = useAppContext();
    const pagination = usePagination();
    const enrollmentsContext = useEnrollmentsContext();
    const enrollmentApi = useEnrollmentApi();

    const {isLoading, data, refetch} = enrollmentApi.queries
        .browseRejected(pagination.model);

    useEffect(() => {
        appContext.setLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            {!isLoading && isDefined(data) &&
                <GenericTableV2
                    columns={columns}
                    dataName="Rejected Enrollments"
                    data={data}
                    pagination={pagination}
                    refetch={refetch}
                    selected={enrollmentsContext.selected}
                />
            }
        </>
    );
};