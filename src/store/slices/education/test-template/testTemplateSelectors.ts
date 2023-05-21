import {useSelector} from "react-redux";
import {RootState} from "@store/store";

export class TestTemplateSelectors {
    private testTemplateState = useSelector((state: RootState) => state.testTemplate);

    // public questionsList = () => {
    //     return this.questionState.list;
    // };
}