import {requestAgent} from "@api/requestAgent";
import {useAppContext} from "@context/ApplicationContext";
import type {IPaginatedList, IPaginationRequest} from "@models/api/pagination";
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
    const {setLoading} = useAppContext();

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
        browseApprovedEnrollments: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<EnrollmentBase>> => {
            setLoading(true);
            try {
                const pagination: IPaginationRequest = {
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
                setLoading(false);
            }
        },
        browseRejectedEnrollments: async (
            pageIndex: number, pageSize: number, isAscending: boolean
        ): Promise<IPaginatedList<EnrollmentBase>> => {
            setLoading(true);
            try {
                const pagination: IPaginationRequest = {
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
                setLoading(false);
            }
        },
        submit: async (enrollmentPostModel: IEnrollmentPost) => {
            setLoading(true);
            try {
                const envelope = await agent.command.submit(enrollmentPostModel);
                if (envelope.isSuccess) {
                    Notify.success("Success", "Successfully enrolled!");
                    return true;
                }
            } finally {
                setLoading(false);
            }
        },
        // TODO: Out \/
        approve: async (id: string) => {
            setLoading(true);
            try {
                const envelope = await agent.command.approve(id);
                if (envelope.isSuccess) {
                    Notify.success("Success", "Successfully approved!");
                    return true;
                }
                return false;
            } finally {
                setLoading(false);
            }
        },
        // TODO: Out \/
        reject: async (id: string) => {
            setLoading(true);
            try {
                const envelope = await agent.command.reject(id);
                if (envelope.isSuccess) {
                    Notify.success("Success", "Successfully rejected!");
                    return true;
                }
                return false;
            } finally {
                setLoading(false);
            }
        }
    };

    const enrollmentSelectors = {
        enrollmentForm: () => state.enrollmentForm,
        approvedEnrollmentsList: () => state.approvedList,
        rejectedEnrollmentsList: () => state.rejectedList,
    };

    return {
        actions: enrollmentActions,
        selectors: enrollmentSelectors,
    };
};