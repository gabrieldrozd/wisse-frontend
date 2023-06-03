import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";

export const _enrollmentPersistActions = [
    enrollmentSlice.actions.persistForm,
    enrollmentSlice.actions.setList,
    enrollmentSlice.actions.setApprovedList,
    enrollmentSlice.actions.setRejectedList,
    enrollmentSlice.actions.setDetails,
    enrollmentSlice.actions.approve,
    enrollmentSlice.actions.reject
];