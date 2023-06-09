import {useTeacherApi} from "@api/hooks/useTeacherApi";
import {useTeachersContext} from "@app.admin/context/teachersContext";
import {GenericTableV2} from "@components/DataDisplay/GenericTableV2";
import {useAppContext} from "@context/ApplicationContext";
import {usePagination} from "@context/PaginationContextProvider";
import type {TeacherBase} from "@models/users/teacher/teacherBrowse";
import type {ColumnDef} from "@tanstack/react-table";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect} from "react";

const columnsHelper = createColumnHelper<TeacherBase>();
const columns: ColumnDef<TeacherBase, any>[] = [
    columnsHelper.accessor(x => x.firstName, {
        header: "First Name",
        cell: value => value.getValue(),
    }),
    columnsHelper.accessor(x => x.lastName, {
        header: "Last Name",
        cell: value => value.getValue(),
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

export const BrowseTeachersTable = () => {
    const appContext = useAppContext();
    const pagination = usePagination();
    const teachersContext = useTeachersContext();
    const teacherApi = useTeacherApi();

    const {isLoading, data, refetch} = teacherApi.queries
        .browseTeachers(pagination.model);

    useEffect(() => {
        appContext.setLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            {!isLoading && data &&
                <GenericTableV2
                    columns={columns}
                    dataName="Teachers"
                    data={data}
                    pagination={pagination}
                    refetch={refetch}
                    selected={teachersContext.selected}
                />
            }
        </>
    );
};