import {useSelector} from "react-redux";
import {RootState} from "@store/store";

export class QuestionSelectors {
    private questionState = useSelector((state: RootState) => state.question);

    public questionsList = () => {
        return this.questionState.list;
    };
}