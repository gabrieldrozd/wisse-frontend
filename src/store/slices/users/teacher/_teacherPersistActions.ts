import {studentSlice} from "@store/slices/users/student/studentSlice";

export const _teacherPersistActions = [
    studentSlice.actions.setList,
    studentSlice.actions.setDetails,
];