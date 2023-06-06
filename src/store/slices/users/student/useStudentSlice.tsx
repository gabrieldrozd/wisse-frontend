import {useDispatch, useSelector} from "react-redux";
import {ActionDispatch, RootState} from "@store/store";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";

export const useStudentSlice = () => {
    const state = useSelector((state: RootState) => state.student);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = studentSlice.actions;
    const agent = requestAgent.users.student;
    const {isLoading} = useAppContext();

    const studentActions = {
        browseStudents: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<StudentBase>> => {
            isLoading.set(true);
            try {
                const pagination: PaginationRequest = {
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
                isLoading.set(false);
            }
        },
        reloadStudents: async () => {
            await studentActions.browseStudents(1, 10, true);
        },
        studentDetails: async (id: string): Promise<StudentDetails> => {
            isLoading.set(true);
            try {
                const envelope = await agent.query.details(id);
                if (envelope.isSuccess) {
                    dispatch(actions.setDetails(envelope.data));
                    return envelope.data;
                }
                return {} as StudentDetails;
            } finally {
                isLoading.set(false);
            }
        }
    };

    const studentSelectors = {
        studentsList: () => state.list,
        studentDetails: () => state.details
    };

    return {
        actions: studentActions,
        selectors: studentSelectors
    };
};