import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import type {IPaginatedList, PaginationRequest} from "@models/api/pagination";
import type {EnrollmentBase} from "@models/enrollment/enrollmentBrowse";
import type {EnrollmentDetails} from "@models/enrollment/enrollmentDetails";
import type {IEnrollmentPost, IEnrollmentPostFormModel} from "@models/enrollment/IEnrollmentPost";
import {Notify} from "@services/Notify";
import {enrollmentSlice} from "@store/slices/enrollment/enrollment/enrollmentSlice";
import type {ActionDispatch, RootState} from "@store/store";
import {useDispatch, useSelector} from "react-redux";

export const useEnrollmentSlice = () => {
    const state = useSelector((state: RootState) => state.enrollment);
    const dispatch = useDispatch<ActionDispatch>();
    const actions = enrollmentSlice.actions;
    const agent = requestAgent.enrollment.enrollment;
    const {isLoading} = useAppContext();

    const enrollmentActions = {
        persistEnrollmentForm: (enrollmentForm: IEnrollmentPost) => {
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
        },
        browseEnrollments: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<EnrollmentBase>> => {
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
        browseApprovedEnrollments: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<EnrollmentBase>> => {
            isLoading.set(true);
            try {
                const pagination: PaginationRequest = {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    isAscending: isAscending,
                };
                const envelope = await agent.query.browseApproved(pagination);
                if (envelope.isSuccess) {
                    dispatch(actions.setApprovedList(envelope.data));
                }
                return envelope.data;
            } finally {
                isLoading.set(false);
            }
        },
        browseRejectedEnrollments: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<EnrollmentBase>> => {
            isLoading.set(true);
            try {
                const pagination: PaginationRequest = {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    isAscending: isAscending,
                };
                const envelope = await agent.query.browseRejected(pagination);
                if (envelope.isSuccess) {
                    dispatch(actions.setRejectedList(envelope.data));
                }
                return envelope.data;
            } finally {
                isLoading.set(false);
            }
        },
        reloadEnrollments: async () => {
            await enrollmentActions.browseEnrollments(1, 10, true);
        },
        enrollmentDetails: async (id: string): Promise<EnrollmentDetails> => {
            isLoading.set(true);
            try {
                const envelope = await agent.query.details(id);
                if (envelope.isSuccess) {
                    dispatch(actions.setDetails(envelope.data));
                    return envelope.data;
                }
                return {} as EnrollmentDetails;
            } finally {
                isLoading.set(false);
            }
        },
        submit: async (enrollmentPostModel: IEnrollmentPost) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.submit(enrollmentPostModel);
                if (envelope.isSuccess) {
                    Notify.success("Success", "Successfully enrolled!");
                    return true;
                }
            } finally {
                isLoading.set(false);
            }
        },
        approve: async (id: string) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.approve(id);
                if (envelope.isSuccess) {
                    dispatch(actions.approve(id));
                    Notify.success("Success", "Successfully approved!");
                    return true;
                }
                return false;
            } finally {
                isLoading.set(false);
            }
        },
        reject: async (id: string) => {
            isLoading.set(true);
            try {
                const envelope = await agent.command.reject(id);
                if (envelope.isSuccess) {
                    dispatch(actions.reject(id));
                    Notify.success("Success", "Successfully rejected!");
                    return true;
                }
                return false;
            } finally {
                isLoading.set(false);
            }
        }
    };

    const enrollmentSelectors = {
        enrollmentForm: () => state.enrollmentForm,
        enrollmentsList: () => state.list,
        approvedEnrollmentsList: () => state.approvedList,
        rejectedEnrollmentsList: () => state.rejectedList,
        enrollmentDetails: () => state.details,
    };

    return {
        actions: enrollmentActions,
        selectors: enrollmentSelectors,
    };
};