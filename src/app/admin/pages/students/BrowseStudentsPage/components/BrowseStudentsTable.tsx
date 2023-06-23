import {useStudentsContext} from "@app.admin/context/studentsContext";
import type {IStudentBase} from "@models/users/student/studentBrowse";
import {useStudentState} from "@store/slices/users/student/useStudentState";
import type {ColumnDef} from "@tanstack/react-table";
import {createColumnHelper} from "@tanstack/react-table";
import {getFullYears, getShortDate} from "@utils/dateUtils";

import {GenericTable} from "@/shared/components/DataDisplay/GenericTable";
import {useAppContext} from "@context/ApplicationContext";
import {usePagination} from "@context/PaginationContextProvider";
import {useEnrollmentsContext} from "@app.admin/context/enrollmentsContext";
import {useEnrollmentApi} from "@api/hooks/useEnrollmentApi";
import {useEffect} from "react";
import {GenericTableV2} from "@components/DataDisplay/GenericTableV2";
import {useStudentApi} from "@api/hooks/useStudentApi";

const columnsHelper = createColumnHelper<IStudentBase>();
const columns: ColumnDef<IStudentBase, any>[] = [
    columnsHelper.accessor(x => x.firstName, {
        header: "First Name",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.lastName, {
        header: "Last Name",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.birthDate, {
        header: "Age",
        cell: value => getFullYears(value.getValue()),
    }),
    columnsHelper.accessor(x => x.birthDate, {
        header: "Birth Date",
        cell: value => getShortDate(value.getValue()),
    }),
    columnsHelper.accessor(x => x.email, {
        header: "Email",
        cell: value => value.getValue()
    }),
    columnsHelper.accessor(x => x.phoneNumber, {
        header: "Phone",
        cell: value => value.getValue(),
    }),
];

export const BrowseStudentsTable = () => {
    const appContext = useAppContext();
    const pagination = usePagination();
    const studentsContext = useStudentsContext();
    const studentApi = useStudentApi();

    const {isLoading, data, refetch} = studentApi.queries
        .browseStudents(pagination.model);

    useEffect(() => {
        appContext.setLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            {!isLoading && data &&
                <GenericTableV2
                    columns={columns}
                    dataName="Students"
                    data={data}
                    pagination={pagination}
                    refetch={refetch}
                    selected={studentsContext.selected}
                />
            }
        </>
    );
};