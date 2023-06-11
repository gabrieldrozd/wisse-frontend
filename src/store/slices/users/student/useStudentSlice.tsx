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
    const agent = requestAgent.users.student;
    const {setLoading} = useAppContext();

    const studentActions = {
        browseStudents: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<StudentBase>> => {
            setLoading(true);
            try {
                const pagination: IPaginationRequest = {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    isAscending: isAscending,
                };
                const envelope = await agent.query.browse(pagination);
                if (envelope.isSuccess) {
                    dispatch(actions.setList(envelope.data));
                }
                return envelope.data;
            } finally {
                setLoading(false);
            }
        }
    };

    const studentSelectors = {
        studentsList: () => state.list
    };

    return {
        actions: studentActions,
        selectors: studentSelectors
    };
};