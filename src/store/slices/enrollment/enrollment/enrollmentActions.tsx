import {requestAgent} from "@api/requestAgent";
import {useGlobalContext} from "@context/ApplicationContext";
import type {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPost, IEnrollmentPostFormModel} from "@models/enrollment/IEnrollmentPost";
import {Notify} from "@services/Notify";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import type {ActionDispatch} from "@store/store";
import {useDispatch} from "react-redux";

export const useEnrollmentActions = () => {
    const enrollmentRequestAgent = requestAgent.enrollment.enrollment;
    const {isLoading} = useGlobalContext();
    const dispatch = useDispatch<ActionDispatch>();
    const actions = enrollmentSlice.actions;

    const persistEnrollmentForm = (enrollmentForm: IEnrollmentPost) => {

        if (enrollmentForm.applicant === undefined || enrollmentForm.contact === undefined) {
            return dispatch(actions.persistForm({} as IEnrollmentPostFormModel));
        }

        const formModel: IEnrollmentPostFormModel = {
            applicant: {
                firstName: enrollmentForm.applicant.firstName,
                lastName: enrollmentForm.applicant.lastName,
                birthDate: enrollmentForm.applicant.birthDate.toString(),
                school: enrollmentForm.applicant.school,
                grade: enrollmentForm.applicant.grade,
                levelKey: enrollmentForm.applicant.levelKey,
            },
            contact: {
                email: enrollmentForm.contact.email,
                phoneNumber: enrollmentForm.contact.phoneNumber,
                zipCode: enrollmentForm.contact.zipCode,
                zipCodeCity: enrollmentForm.contact.zipCodeCity,
                state: enrollmentForm.contact.state,
                city: enrollmentForm.contact.city,
                street: enrollmentForm.contact.street,
                houseNumber: enrollmentForm.contact.houseNumber,
            }
        };

        dispatch(actions.persistForm(formModel));
    };

    const browseEnrollments = async (
        pageIndex: number, pageSize: number, isAscending: boolean
    ): Promise<IPaginatedList<EnrollmentBase>> => {
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

    const browseApprovedEnrollments = async (
        pageIndex: number, pageSize: number, isAscending: boolean
    ): Promise<IPaginatedList<EnrollmentBase>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                isAscending: isAscending,
            };
            const envelope = await enrollmentRequestAgent.query.browseApproved(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setApprovedList(envelope.data));
            }
            return envelope.data;
        } finally {
            isLoading.set(false);
        }
    };

    const browseRejectedEnrollments = async (
        pageIndex: number, pageSize: number, isAscending: boolean
    ): Promise<IPaginatedList<EnrollmentBase>> => {
        isLoading.set(true);
        try {
            const pagination: PaginationRequest = {
                pageIndex: pageIndex,
                pageSize: pageSize,
                isAscending: isAscending,
            };
            const envelope = await enrollmentRequestAgent.query.browseRejected(pagination);
            if (envelope.isSuccess) {
                dispatch(actions.setRejectedList(envelope.data));
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

    const submit = async (enrollmentPostModel: IEnrollmentPost) => {
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
        persistEnrollmentForm,
        browseEnrollments,
        browseApprovedEnrollments,
        browseRejectedEnrollments,
        reloadEnrollments,
        enrollmentDetails,
        submit,
        approve,
        reject,
    };
};