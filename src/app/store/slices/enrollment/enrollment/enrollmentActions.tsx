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

export const useEnrollmentActions = () => {
    const enrollmentRequestAgent = requestAgent.enrollment.enrollment;
    const navigate = useNavigate();
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = enrollmentSlice.actions;

    const browseEnrollments = async (pagination: PaginationRequest): Promise<PaginatedList<EnrollmentBase>> => {
        isLoading.set(true);
        try {
            const envelope = await enrollmentRequestAgent.query.browse(pagination);
            return envelope.data;
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

    return {
        browseEnrollments,
        submit,
    };
};