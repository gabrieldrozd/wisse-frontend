import {useSelector} from "react-redux";
import {RootState} from "@store/store";

export class StudentSelectors {
    private studentState = useSelector((state: RootState) => state.student);

    public studentsList = () => {
        return this.studentState.list;
    }

    public studentDetails = () => {
        return this.studentState.details;
    }
}