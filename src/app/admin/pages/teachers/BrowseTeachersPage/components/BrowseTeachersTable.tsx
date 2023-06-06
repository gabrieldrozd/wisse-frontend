import {useTeachersContext} from "@app.admin/context/teachersContext";
import {GenericTable} from "@components/DataDisplay/GenericTable";
import type {TeacherBase} from "@models/users/teacher/teacherBrowse";
import {useTeacherSlice} from "@store/slices/users/teacher/useTeacherSlice";
import type {ColumnDef} from "@tanstack/react-table";
import { createColumnHelper} from "@tanstack/react-table";

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
    const context = useTeachersContext();
    const {actions, selectors} = useTeacherSlice();

    return (
        <GenericTable
            columns={columns}
            dataName="Teachers"
            data={selectors.teachersList()}
            fetchData={actions.browseTeachers}
            selectedRow={context.selected?.value}
            selectRow={context.selected?.set}
            unselectRow={context.selected?.unset}
        />
    );
};