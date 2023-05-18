import {useSelector} from "react-redux";
import {RootState} from "@store/store";

export class EnrollmentSelectors {
    private enrollmentState = useSelector((state: RootState) => state.enrollment);

    public enrollmentsList = () => {
        return this.enrollmentState.list;
    }
    public approvedEnrollmentsList = () => {
        return this.enrollmentState.approvedList;
    }
    public rejectedEnrollmentsList = () => {
        return this.enrollmentState.rejectedList;
    }

    public enrollmentDetails = () => {
        return this.enrollmentState.details;
    }
}