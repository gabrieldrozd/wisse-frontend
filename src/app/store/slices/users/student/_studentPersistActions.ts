import {studentSlice} from "@store/slices/users/student/studentSlice";

export const _studentPersistActions = [
    studentSlice.actions.setList,
    studentSlice.actions.setDetails,
];