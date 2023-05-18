import {GenericTable} from "@components/DataDisplay/GenericTable";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {useTeachersContext} from "@app.admin/context/teachersContext";
import {useTeacherSlice} from "@store/slices/users/teacher/teacherSlice";
import {TeacherBase} from "@models/users/teacher/teacherBrowse";

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