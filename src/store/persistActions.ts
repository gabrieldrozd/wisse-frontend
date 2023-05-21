import {_questionPersistActions} from "@store/slices/education/question/_questionPersistActions";
import {_testTemplatePersistActions} from "@store/slices/education/test-template/_testTemplatePersistActions";
import {_enrollmentPersistActions} from "@store/slices/enrollment/enrollment/_enrollmentPersistActions";
import {_authPersistActions} from "@store/slices/users/auth/_authPersistActions";
import {_studentPersistActions} from "@store/slices/users/student/_studentPersistActions";
import {_teacherPersistActions} from "@store/slices/users/teacher/_teacherPersistActions";

export const persistActions = [
    ..._questionPersistActions,
    ..._testTemplatePersistActions,
    ..._enrollmentPersistActions,
    ..._authPersistActions,
    ..._studentPersistActions,
    ..._teacherPersistActions
];