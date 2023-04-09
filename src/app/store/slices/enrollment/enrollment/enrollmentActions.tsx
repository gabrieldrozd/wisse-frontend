import {useGlobalContext} from "@core/context/ApplicationContext";
import {useDispatch} from "react-redux";
import {ActionDispatch} from "@store/store";
import {requestAgent} from "@api/requestAgent";
import {Notify} from "@core/services/Notify";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import {EnrollmentPost} from "@models/enrollment/enrollmentPost";
import {useNavigate} from "react-router-dom";
import {PaginatedList, PaginationRequest} from "@models/api/pagination";
import {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";

export const useEnrollmentActions = () => {
    const enrollmentRequestAgent = requestAgent.enrollment.enrollment;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = enrollmentSlice.actions;

    const browseEnrollments = async (pageIndex: number, pageSize: number, isAscending: boolean): Promise<PaginatedList<EnrollmentBase>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                isAscending: isAscending,
            };
            const envelope = await enrollmentRequestAgent.query.browse(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setList(envelope.data));
            }
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    const reloadEnrollments = async () => {
        await browseEnrollments(1, 10, true);
    };

    const enrollmentDetails = async (id: string): Promise<EnrollmentDetails> => {
        isLoading.set(true);
        try {
            const envelope = await enrollmentRequestAgent.query.details(id);
            if (envelope.isSuccess) {
                dispatch(actions.setDetails(envelope.data));
                return envelope.data;
            }
            return {} as EnrollmentDetails;
        } finally {
            isLoading.set(false);
        }
    };

    const submit = async (enrollmentPostModel: EnrollmentPost) => {
        isLoading.set(true);
        try {
            const envelope = await enrollmentRequestAgent.command.submit(enrollmentPostModel);
            if (envelope.isSuccess) {
                Notify.success("Success", "Successfully enrolled!");
                return true;
            }
        } finally {
            isLoading.set(false);
        }
    };

    const approve = async (id: string) => {
        isLoading.set(true);
        try {
            const envelope = await enrollmentRequestAgent.command.approve(id);
            if (envelope.isSuccess) {
                dispatch(actions.approve(id));
                Notify.success("Success", "Successfully approved!");
                return true;
            }
            return false;
        } finally {
            isLoading.set(false);
        }
    };

    const reject = async (id: string) => {
        isLoading.set(true);
        try {
            const envelope = await enrollmentRequestAgent.command.reject(id);
            if (envelope.isSuccess) {
                dispatch(actions.reject(id));
                Notify.success("Success", "Successfully rejected!");
                return true;
            }
            return false;
        } finally {
            isLoading.set(false);
        }
    };

    return {
        enrollmentDetails,
        browseEnrollments,
        reloadEnrollments,
        submit,
        approve,
        reject,
    };
};