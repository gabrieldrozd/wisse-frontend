import {GenericTable} from "@/shared/components/DataDisplay/GenericTable";
import {useStudentsContext} from "@app.admin/context/studentsContext";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {getFullYears, getShortDate} from "@utils/dateUtils";
import {StudentBase} from "@models/users/student/studentBrowse";
import {useStudentSlice} from "@store/slices/users/student/studentSlice";

const columnsHelper = createColumnHelper<StudentBase>();
const columns: ColumnDef<StudentBase, any>[] = [
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
    const context = useStudentsContext();
    const {actions, selectors} = useStudentSlice();

    return (
        <GenericTable
            columns={columns}
            dataName="Students"
            data={selectors.studentsList()}
            fetchData={actions.browseStudents}
            selectedRow={context.selected?.value}
            selectRow={context.selected?.set}
            unselectRow={context.selected?.unset}
        />
    );
};