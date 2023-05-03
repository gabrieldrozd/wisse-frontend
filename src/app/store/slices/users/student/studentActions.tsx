import {useGlobalContext} from "@core/context/ApplicationContext";
import {useDispatch} from "react-redux";
import {ActionDispatch} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {useNavigate} from "react-router-dom";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {studentSlice} from "@store/slices/users/student/studentSlice";
import {StudentBase} from "@models/users/student/studentBrowse";
import {StudentDetails} from "@models/users/student/studentDetails";

export const useStudentActions = () => {
    const studentRequestAgent = requestAgent.users.student;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = studentSlice.actions;

    const browseStudents = async (pageIndex: number, pageSize: number, isAscending: boolean): Promise<PaginatedList<StudentBase>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                isAscending: isAscending,
            };
            const envelope = await studentRequestAgent.query.browse(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setList(envelope.data));
            }
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    const reloadStudents = async () => {
        await browseStudents(1, 10, true);
    };

    const studentDetails = async (id: string): Promise<StudentDetails> => {
        isLoading.set(true);
        try {
            const envelope = await studentRequestAgent.query.details(id);
            if (envelope.isSuccess) {
                dispatch(actions.setDetails(envelope.data));
                return envelope.data;
            }
            return {} as StudentDetails;
        } finally {
            isLoading.set(false);
        }
    };

    return {
        browseStudents,
        reloadStudents,
        studentDetails,
    };
};