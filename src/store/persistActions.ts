import {_authPersistActions} from "@store/slices/users/auth/_authPersistActions";
import {_enrollmentPersistActions} from "@store/slices/enrollment/enrollment/_enrollmentPersistActions";
import {_studentPersistActions} from "@store/slices/users/student/_studentPersistActions";
import {_teacherPersistActions} from "@store/slices/users/teacher/_teacherPersistActions";
import {_questionPersistActions} from "@store/slices/education/question/_questionPersistActions";

export const persistActions = [
    ..._questionPersistActions,
    ..._enrollmentPersistActions,
    ..._authPersistActions,
    ..._studentPersistActions,
    ..._teacherPersistActions
];