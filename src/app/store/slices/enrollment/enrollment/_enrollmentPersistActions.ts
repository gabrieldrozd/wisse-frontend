import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";

export const _enrollmentPersistActions = [
    enrollmentSlice.actions.setList,
    enrollmentSlice.actions.setDetails,
    enrollmentSlice.actions.approve,
    enrollmentSlice.actions.reject
];