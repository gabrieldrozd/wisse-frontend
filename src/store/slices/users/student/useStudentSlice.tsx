import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
import type {StudentBase} from "@models/users/student/studentBrowse";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useStudentSlice = () => {
    const state = useSelector((state: RootState) => state.student);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = studentSlice.actions;
    const {setLoading} = useAppContext();

    const studentActions = {};

    const studentSelectors = {};

    return {
        actions: studentActions,
        selectors: studentSelectors
    };
};