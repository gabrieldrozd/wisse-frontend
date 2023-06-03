import type {RootState} from "@store/store";
import {useSelector} from "react-redux";

export class EnrollmentSelectors {
    private enrollmentState = useSelector((state: RootState) => state.enrollment);

    public enrollmentForm = () => {
        return this.enrollmentState.enrollmentForm;
    };

    public enrollmentsList = () => {
        return this.enrollmentState.list;
    };
    public approvedEnrollmentsList = () => {
        return this.enrollmentState.approvedList;
    };
    public rejectedEnrollmentsList = () => {
        return this.enrollmentState.rejectedList;
    };

    public enrollmentDetails = () => {
        return this.enrollmentState.details;
    };
}