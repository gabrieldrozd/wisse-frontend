import {useSelector} from "react-redux";
import {RootState} from "@store/store";

export class TeacherSelectors {
    private teacherState = useSelector((state: RootState) => state.teacher);

    public teachersList = () => {
        return this.teacherState.list;
    }

    public teacherDetails = () => {
        return this.teacherState.details;
    }
}